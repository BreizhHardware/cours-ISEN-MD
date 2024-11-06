/*----------------------------------------------------------------------------*/
/*                                                                            */
/*                                 liste.c                                    */
/*                                                                            */
/*	Fonctions permettant la traduction d'un grafcet en automate           */
/*	d'etats finis sous forme de liste de liste puis sa  traduc-           */
/*	tion en fichiers MEC : 	<nom_du_prog>.mec                             */
/*			      	<nom_du_prog>.mtr                             */
/*                                                                            */
/*----------------------------------------------------------------------------*/

#include <stdio.h>
#include <strings.h>
#include "bdd.tab.h"
#include "liste.h"
#include "acces.h"
#include "debug.h"

#define MALLOC_LAURENT(x)	((x*) malloc(sizeof(x)))
#define CALLOC_LAURENT(n,x)	((x*) calloc((unsigned)n, sizeof(x)))
#define LONG_MAX_COND	1500

/*                  declaration des variables globales                        */
BOOLEEN Resultat;
bdd_manager *man;
char tab_bdd[1000][1000]; 
int Ibdd;
char Cond_Bdd[LONG_MAX_COND];

int erreur_de_syntaxe, compte_flush;


/*----------------------------------------------------------------------------*/
/*			Free_Peres	                                      */
/* description:								      */
/*		Permet la liberation recursive d'une liste de peres d'un      */
/*		Automate						      */
/* parametres:								      */
/*		Et_Peres	: pointeur sur le premier pere de la liste    */
/*----------------------------------------------------------------------------*/

void Free_Peres (Et_Peres)
etapes_pere *Et_Peres;
{
	if (Et_Peres->pere_suivant == NULL)
		{free(Et_Peres);}
	else
		{Free_Peres (Et_Peres->pere_suivant);
		 free(Et_Peres);
		}
}

/*----------------------------------------------------------------------------*/
/*			Free_Fils	                                      */
/* description:								      */
/*		Permet la liberation recursive d'une liste de fild  d'un      */
/*		Automate						      */
/* parametres:								      */
/*		Cond_Fils	: pointeur sur le premier fils de la liste    */
/*----------------------------------------------------------------------------*/

void Free_Fils (Cond_Fils)
cond_auto_fils *Cond_Fils;
{
	if (Cond_Fils->auto_fils_suivant == NULL)
		{free(Cond_Fils);}
	else
		{Free_Fils (Cond_Fils->auto_fils_suivant);
		 free(Cond_Fils);
		}
}


/*----------------------------------------------------------------------------*/
/*			cree_liste_automate                                   */
/*                                                                            */
/* description:								      */
/*		cree une liste d'automates.				      */
/* parametres:								      */
/*----------------------------------------------------------------------------*/
liste_automate *cree_liste_automate()
{
liste_automate *Nouv_Liste;

	if(Nouv_Liste = (liste_automate *) MALLOC_LAURENT(liste_automate)) {
		Nouv_Liste->longueur = 0;
		Nouv_Liste->premier = NULL;
		Nouv_Liste->dernier = NULL;
	}
	else {
		printf("Allocation Memoire impossible dans \"cree_liste_automate\"");
		exit(0);
		}
	return(Nouv_Liste);
}



/*------------------------------------------------------------------------------*/
/*			construction_liste_base                              	*/
/* description:								     	*/
/*		construit la liste des automates de bases a partir de celle	*/
/*		des automates atomiques.					*/
/*		Dans la liste des automates atomiques il y a :			*/
/*			- des AA complets, c'est a dire possedant une etape 	*/
/*			pere, une condition de transition et le nom de l'auto-	*/
/*			mate suivant.						*/
/*			- des AA incomplets, c'est a dire possedant plusieurs	*/
/*			peres, pas de condition de transition.			*/
/*										*/
/*		Dans cette procedure, on cherche a "fusionner" les automates	*/
/*		atomiques complets possedant des peres identiques.		*/	
/*		Marche a suivre :						*/
/*			-1- On prend dans la liste des AA un automate dit de	*/
/*			reference (Auto_Ref).					*/
/*			-2- On parcours la liste des AA avec un automate de 	*/
/*			recherche (Auto_Rech).					*/
/*			-3- Si Auto_Ref et Auto_Rech ont le meme pere, il faut	*/
/*			les synchroniser. On obtient Auto_Synchro. On supprime	*/
/*			alors Auto_ref, Auto_Rech et on ajoute Auto_Synchro.	*/
/*			              						*/
/* parametres:								      	*/
/*		Liste_Atomique	: pointeur sur la liste	des AA		      	*/
/*		On rend la liste de Base.					*/
/*------------------------------------------------------------------------------*/
liste_automate *construction_liste_base(Liste_Atomique)
liste_automate *Liste_Atomique;
{
liste_automate *Liste;
automate *Auto_Ref,		/* Automate de Reference */
	 *Auto_Av_Ref,		/* Automate precedent Auto_Ref : permet de restaurer les liens */
	 *Auto_Rech,		/* Automate de Recherche */
	 *Auto_Av_Rech,		/* Automate precedent Auto_Rech : permet de restaurer les liens */
	 *Auto_Supp,		/* Automate a supprimer */
	 *Auto_Av_Supp,		/* Automate precedent Auto_Supp : permet de restaurer les liens */
	 *Auto_Temp,		/* Automate temporaire */
	 *Auto_Synchro;		/* Automate synchronise : Auto_Ref * Auto_Rech */

BOOLEEN	Synchro,		/* Marque de synchronisation */
	Test_Auto_Ref;		/* Marque : Auto_Ref est-il AA complet */

	
	Liste = Liste_Atomique;	/* La liste rendue = Liste_Atomique travaille' */
	if(Liste->longueur > 1) {
		/*  Initialisations */
		Auto_Av_Ref = Liste->premier;
		Auto_Ref = Liste->premier;
		Auto_Av_Rech = Liste->premier;
		Auto_Rech = Auto_Ref->auto_suivant;
		Test_Auto_Ref = NON;

		while((Auto_Ref != Liste->dernier) && (Auto_Ref != NULL)) {
			Synchro = NON;
			Test_Auto_Ref = test_automate_atomique(Auto_Ref);
			while((Auto_Rech != NULL) && (Synchro == NON) && (Test_Auto_Ref == OUI)) {
				if(test_automate_atomique(Auto_Rech)) {
					if(compare_peres_automate_atomique(Auto_Ref, Auto_Rech)) {
						/* Les deux automates sont atomiques complets et leur etape pere */
						/* sont identiques : on les synchronise */

						Auto_Synchro = produit_synchro_atomique(Auto_Ref, Auto_Rech, Liste);
						Synchro = OUI;	/* permet de sortir de la boucle */

						/* On supprime Auto_Rech de la liste */
						Auto_Supp = Auto_Rech;
						Auto_Av_Supp = Auto_Av_Rech;
						Auto_Rech = supprime_auto_atomique(Auto_Supp, Auto_Av_Supp, Liste);

						/* On supprime Auto_Ref de la liste */
						Auto_Supp = Auto_Ref;
						Auto_Av_Supp = Auto_Av_Ref;
						Auto_Ref = supprime_auto_atomique(Auto_Supp, Auto_Av_Supp, Liste);
					}
					else {
						/* On continue la recherche d'un automate compatible */
						Auto_Av_Rech = Auto_Rech;
						Auto_Rech = Auto_Rech->auto_suivant;
					}
				}
				else {
					/* On continue la recherche d'un automate compatible */
					Auto_Av_Rech = Auto_Rech;
					Auto_Rech = Auto_Rech->auto_suivant;
				}
			}
			if(Synchro == OUI) {  /* On a fait une synchronisation */	
				/* On rajoute l'automate synchronise	*/
				Auto_Temp = Auto_Ref;
				Auto_Synchro->auto_suivant = Auto_Temp;
				if (Auto_Av_Ref == Liste ->dernier) {
					/* Si les suppressions de Auto_Ref et Auto_Rech ont elimine la queue 	*/
					/* de la liste								*/
					Liste->dernier = Auto_Synchro;
					Auto_Av_Ref->auto_suivant = Auto_Synchro; 

				}
				else {	
					if(Auto_Temp == Liste->premier) {
						/* Si la suppresion de Auto_Ref a elimine la tete de la liste	*/
						Liste->premier = Auto_Synchro;
						Auto_Av_Ref = Auto_Synchro;
					}
					else
						Auto_Av_Ref->auto_suivant = Auto_Synchro; 
				}
				Auto_Ref = Auto_Synchro; 
				Liste->longueur++;
				Auto_Av_Rech = Auto_Ref;
				Auto_Rech = Auto_Ref->auto_suivant;
			}
			else {
				/* On fait progresser Auto_Ref et Auto_Rech d'un cran */
				Auto_Av_Ref = Auto_Ref;
				Auto_Ref = Auto_Ref->auto_suivant;
				Auto_Av_Rech = Auto_Ref;
				/* Si on est au bout de la liste, on ne peut pas faire progresser Auto_Rech */
				if (Auto_Ref != NULL) Auto_Rech = Auto_Ref->auto_suivant;
			}
		}
		return(Liste);
	}
	else
		return(Liste);
}


/*----------------------------------------------------------------------------*/
/*			construction_liste_complete                           */
/* description:								      */  
/*		construit la liste contenant l'automate d'etats finis complet */
/* parametres:								      */
/*		tabEt		: pointeur sur un pointeur de structure Et    */
/*				  (adresse du tableau des etapes)   	      */
/*		Liste_Base	: pointeur sur la liste de base		      */
/*----------------------------------------------------------------------------*/
liste_automate *construction_liste_complete(tabEt, Liste_Base)
Et **tabEt;
liste_automate *Liste_Base;
{
liste_automate *Liste_Complete;
automate *Auto_Ref,
	 *Auto_Initial,
	 *Auto1,
	 *Auto2,
	 *Auto_Temp,
	 *Auto_Fils,
	 *Nouv_Fils,
	 *Nouv_Auto,
	 *Auto_Synchro;
cond_auto_fils  *Cond_Fils_Temp,
		*Cond;
etapes_pere *Peres1,
	    *Peres2,
	    *Pere,
	    *Etape_Fils;

etapes_pere *deb_peres;
int Nb_Peres,
    I,J,
    Nb_Cond_Fils_Ref,
    Nb_Cond_Fils_Synchro;

	Liste_Complete = cree_liste_automate();
	Auto_Initial = inst_automate(1, NULL);	
	Auto_Initial->peres = recherche_etapes_initiales(tabEt);
	if (Auto_Initial->peres == NULL) {
		printf("Pas d'etapes initiales dans le fichiers .gt\n");
		printf("Impossible de continuer...\n");
		exit(0);
	}
	Auto_Initial = existance_auto_intermediaire(Auto_Initial->peres, Liste_Base);
	Auto_Initial = ajoute_automate(Auto_Initial->num_auto, Auto_Initial->peres, Auto_Initial->cond_fils, Liste_Complete);
	rempl_Xi(Auto_Initial);
	Auto_Ref = Liste_Complete->premier;
	while(Auto_Ref != NULL) {
		if(Auto_Ref->cond_fils == NULL) {   /* l'automate est incomplet. On le complete */ 	
			/*printf("automate incomplet\n");*/
			Nb_Peres = calcul_nb_peres(Auto_Ref);
			Peres1 = inst_etapes_pere(Auto_Ref->peres->num_gra, Auto_Ref->peres->num_pere, NULL);		
			Auto1 = recherche_auto_base_ref(Peres1->num_gra, Peres1->num_pere, Liste_Base);			
			Peres2 = Auto_Ref->peres->pere_suivant;
			Auto2 = inst_automate(-1, NULL);
			while(Peres2 != NULL) {
				ajoute_etapes_pere(Peres2->num_gra, Peres2->num_pere, Auto2);	
				Peres2 = Peres2->pere_suivant;
			}
			for(I=1; I<Nb_Peres; I++) {
				Auto_Temp = recherche_auto_base_ref(Auto2->peres->num_gra, Auto2->peres->num_pere, Liste_Base);
				if((Auto1->cond_fils != NULL) && (Auto_Temp->cond_fils != NULL)) {
					Auto1 = produit_synchro(Auto1,Auto_Temp, Liste_Base, tabEt);
				}
				else {
					if(Auto1->cond_fils == NULL) {
						/*  On ajoute les etapes peres de Auto1 et Auto_Temp dans Auto_Synchro 	*/
						/*  On ajoute les etapes puits de Auto_Synchro dans la liste des etapes */
						/*  peres de ses automates fils						*/
						Auto_Synchro = inst_automate(-1,NULL);
						Auto_Synchro->peres = ajoute_etapes_peres_synchro(Auto1, Auto_Temp);
						Pere = Auto_Synchro->peres;
						Cond = Auto_Temp->cond_fils;
						while(Pere != NULL) {
							if(test_etape_puits(tabEt, Pere->num_gra, Pere->num_pere)) {
								while(Cond != NULL) {
									Auto_Fils = recherche_automate(Cond->num_auto_fils,Liste_Base);
									Etape_Fils = Auto_Fils->peres;
									Nouv_Fils = inst_automate(-2,Etape_Fils);
									if(!existance_pere(Pere->num_gra, Pere->num_pere, Nouv_Fils->peres))
										ajoute_etapes_pere(Pere->num_gra, Pere->num_pere, Nouv_Fils);	
									Nouv_Auto = existance_auto_intermediaire(Nouv_Fils->peres, Liste_Base);
									ajoute_cond_auto_fils(Cond->cond,Nouv_Auto->num_auto,Auto_Synchro);
									Cond = Cond->auto_fils_suivant;
								}
							}
							Pere = Pere->pere_suivant;
						}
						Auto1 = Auto_Synchro;
					}
					else { 
						Auto_Synchro = inst_automate(-1,NULL);
						Auto_Synchro->peres = ajoute_etapes_peres_synchro(Auto1, Auto_Temp);
						Pere = Auto_Synchro->peres;
						Cond = Auto1->cond_fils;
						while(Pere != NULL) {
							if(test_etape_puits(tabEt, Pere->num_gra, Pere->num_pere)) {		
								while(Cond != NULL) {
									Auto_Fils = recherche_automate(Cond->num_auto_fils,Liste_Base);
									Etape_Fils = Auto_Fils->peres;
									Nouv_Fils = inst_automate(-2,Etape_Fils);
									if(!existance_pere(Pere->num_gra, Pere->num_pere, Nouv_Fils->peres))
										ajoute_etapes_pere(Pere->num_gra, Pere->num_pere, Nouv_Fils);
									Nouv_Auto = existance_auto_intermediaire(Nouv_Fils->peres, Liste_Base);
									ajoute_cond_auto_fils(Cond->cond,Nouv_Auto->num_auto,Auto_Synchro);
									Cond = Cond->auto_fils_suivant;
								}
							}
							Pere = Pere->pere_suivant;
						}
						Auto1 = Auto_Synchro;
					}

				}
				Auto2->peres = Auto2->peres->pere_suivant;
			}
			Auto_Synchro = Auto1;
			rempl_Xi(Auto_Synchro);

			/* l'automate synchronise est construit, il faut le ranger */
			/* et ajouter ses automates fils dans la liste		   */
			
			Nb_Cond_Fils_Synchro = calcul_nb_cond_fils(Auto_Synchro);
			if(Nb_Cond_Fils_Synchro != 0) 
				Cond_Fils_Temp = Auto_Synchro->cond_fils;
			for(J=1; J<=Nb_Cond_Fils_Synchro; J++) {	
				/* rangement, fils par fils	*/
				if(strcmp(Cond_Fils_Temp->cond,"false") != 0)
					ajoute_cond_auto_fils(Cond_Fils_Temp->cond, Cond_Fils_Temp->num_auto_fils, Auto_Ref);

				/* ajout des automates fils	*/
				if((recherche_automate(Cond_Fils_Temp->num_auto_fils, Liste_Complete)) == NULL) {
					 /* L'automate fils que l'on cherche a ranger ne fait pas */
					 /* encore partie de la liste_complete, mais deja de la   */
					 /* liste de base (cf produit de synchronisation). Connais*/
					 /* sant son numero, on recupere la liste de ses etapes   */
					 /* pere, puis on le range dans liste_complete		  */

					Auto_Temp = recherche_automate(Cond_Fils_Temp->num_auto_fils, Liste_Base);
					if(!existance_pere(-1, -1, Auto_Temp->peres)) {
						if(Auto_Temp->cond_fils != NULL) { 
							if(strcmp(Auto_Temp->cond_fils->cond,"false")==0)
								ajoute_automate(Auto_Temp->num_auto, Auto_Temp->peres, NULL, Liste_Complete);
							else
								ajoute_automate(Auto_Temp->num_auto, Auto_Temp->peres, Auto_Temp->cond_fils, Liste_Complete);
						}
						else
							ajoute_automate(Auto_Temp->num_auto, Auto_Temp->peres, NULL, Liste_Complete);
					}
				}
				Cond_Fils_Temp = Cond_Fils_Temp->auto_fils_suivant;
			}
			
		}
		else {	/* l'automate est complet, on range ses automates fils */  
			/*printf("automate complet\n");*/
			Nb_Cond_Fils_Ref = calcul_nb_cond_fils(Auto_Ref);
			Cond_Fils_Temp = Auto_Ref->cond_fils;
			for(J=1; J<=Nb_Cond_Fils_Ref; J++)
			{
				if((recherche_automate(Cond_Fils_Temp->num_auto_fils, Liste_Complete)) == NULL) {
					Auto_Temp = recherche_automate(Cond_Fils_Temp->num_auto_fils, Liste_Base);
					if(!existance_pere(-1, -1,Auto_Temp->peres)) {
						if(Auto_Temp->cond_fils != NULL) { 
							if(strcmp(Auto_Temp->cond_fils->cond,"false")==0)
								ajoute_automate(Auto_Temp->num_auto, Auto_Temp->peres, NULL, Liste_Complete);
							else
								ajoute_automate(Auto_Temp->num_auto, Auto_Temp->peres, Auto_Temp->cond_fils, Liste_Complete);
						}
						else
							ajoute_automate(Auto_Temp->num_auto, Auto_Temp->peres, Auto_Temp->cond_fils, Liste_Complete);
					}	
				}
			Cond_Fils_Temp = Cond_Fils_Temp->auto_fils_suivant;
			}
		}
		rempl_Xi(Auto_Ref);
		printf(".");
			
		fflush(stdout);

		printf("%d ",++compte_flush);
		deb_peres = Auto_Ref->peres;
		while(deb_peres != NULL)
			{printf("%d_%d ",deb_peres->num_gra, deb_peres->num_pere);
			 deb_peres = deb_peres->pere_suivant;
			}
		printf("\n");
		system("pstat -s");

		Auto_Ref = Auto_Ref->auto_suivant;
	}
	printf("\n");
	return(Liste_Complete);

}


/*----------------------------------------------------------------------------*/
/*			construction_liste_ARS	                              */
/* description:								      */  
/*		construit la liste contenant l'automate d'etats finis complet */
/*			avec recherche de stabilite			      */
/* parametres:								      */
/*		tabEt		: pointeur sur un pointeur de structure Et    */
/*				  (adresse du tableau des etapes)   	      */
/*		tabTr		: pointeur sur un pointeur de structure Tr    */
/*				  (adresse du tableau des etapes)   	      */
/*		Liste_Complete	: pointeur sur la liste complete	      */
/*----------------------------------------------------------------------------*/
liste_automate *construction_liste_ARS (tabEt, tabTr, Liste_Complete)
Et **tabEt;
Tr **tabTr;
liste_automate *Liste_Complete;
{
liste_automate *Liste_ARS,
	       *Liste_ARS_Complete;
liste_etat *Liste_Etat;
liste_liaison *Liste_Liaison;
automate *Auto_Ref,
	 *Auto_Initial,
	 *Nouv_Auto,
	 *Auto_Pere,
	 *Auto_Fils,
	 *Liste_peres;
liaison *Liaison,
	*Liaison_rech;
etat *Etat_Ref;
cond_auto_fils  *Cond_Init,
		*Cond,
		*Cond_Fils;
char Nouv_Cond[LONG_MAX_COND],
     Pere[LONG_MAX_COND],
     Liste_Peres[LONG_MAX_COND];
etapes_pere *Et_Pere;
Et **ptrEtAv,
   **ptrEtAp;
int Niveau;
BOOLEEN ajout,
	premier;

	Liste_ARS = cree_liste_automate();
	Auto_Initial = Liste_Complete->premier;
	ajoute_automate(Auto_Initial->num_auto, Auto_Initial->peres, NULL, Liste_ARS);
	Nouv_Auto = Liste_ARS->premier;
	Auto_Initial = Auto_Initial->auto_suivant;
	while(Auto_Initial != NULL) {
		ajoute_automate(Auto_Initial->num_auto, Auto_Initial->peres, NULL, Liste_ARS);
		Nouv_Auto = Nouv_Auto->auto_suivant;
		Auto_Initial = Auto_Initial->auto_suivant;
	}

	/* La liste_ARS contient tous les automates de la */
	/* liste complete avec leur condition de bouclage */
	Auto_Ref = Liste_ARS->premier;
	Auto_Initial = Liste_Complete->premier;
	while(Auto_Ref != NULL) {
		bzero(Nouv_Cond,LONG_MAX_COND);
		Cond = Auto_Ref->cond_fils;
		if(Cond == NULL) {
			Auto_Initial = recherche_automate(Auto_Ref->num_auto,Liste_Complete);
			if(Auto_Initial->cond_fils != NULL) {
				/* l automate correspondant de la liste complete n'est pas un automate puits */
				strcpy(Nouv_Cond,cree_cond_bouclage(tabEt, Auto_Ref));
				if((strcmp(Nouv_Cond,"") != 0) && (verification_BDD(Nouv_Cond)))
					ajoute_cond_auto_fils(Nouv_Cond,Auto_Ref->num_auto,Auto_Ref);
			}
		}
		/* On ajoute les autres conditions dans l'automate de la liste_ARS */
		Cond_Init = Auto_Initial->cond_fils;
		while(Cond_Init != NULL) {
			if(Cond_Init->num_auto_fils != Auto_Ref->num_auto)
				ajoute_cond_auto_fils(Cond_Init->cond,Cond_Init->num_auto_fils,Auto_Ref);
			Cond_Init = Cond_Init->auto_fils_suivant;
		}			
		Auto_Ref = Auto_Ref->auto_suivant;
		Auto_Initial = Auto_Initial->auto_suivant;
	}
	/*On va supprimer les noms des etapes dans les transitions de convergence en ET	*/				
	while(*tabTr) {
		if(nbEt((*tabTr)->etAvant)>=2) {
			ptrEtAv = (*tabTr)->etAvant;
			Liste_peres = inst_automate(0,NULL);
			while(*ptrEtAv) {
				ajoute_etapes_pere((*ptrEtAv)->gra, (*ptrEtAv)->num, Liste_peres);
				ptrEtAv++;
			}
			Auto_Pere = recherche_auto_et_pere(Liste_peres,Liste_ARS);
			Liste_peres->peres = NULL;
			ptrEtAp = (*tabTr)->etApres;
			while(*ptrEtAp) {
				ajoute_etapes_pere((*ptrEtAp)->gra, (*ptrEtAp)->num, Liste_peres);
				ptrEtAp++;
			}
			Auto_Fils = recherche_auto_et_pere(Liste_peres,Liste_ARS);
			strcpy(Nouv_Cond,(*tabTr)->condition);
			if((Auto_Pere != NULL)&&(Auto_Fils != NULL)) {
				Cond_Init = Auto_Pere->cond_fils;
				while(Cond_Init->num_auto_fils != Auto_Fils->num_auto)
					Cond_Init = Cond_Init->auto_fils_suivant;
				strcpy(Cond_Init->cond, Nouv_Cond);
			}
		}
	tabTr++;
	}
	/*affiche_liste(Liste_ARS);*/
	/* On ajoute les liaisons dues a la recherche de stabilite */
	Auto_Ref = Liste_ARS->premier;
	Liste_Etat = cree_liste_etat();
	Liste_Liaison = cree_liste_liaison();
	Auto_Ref = Liste_ARS->premier;
	ajoute_etat(Auto_Ref->num_auto,Liste_Etat);
	Etat_Ref = Liste_Etat->premier;
	Liste_ARS_Complete = cree_liste_automate();
	while(Etat_Ref != NULL) {
		Auto_Ref = recherche_automate(Etat_Ref->num_etat,Liste_ARS);
		Liste_Liaison->num_auto_pere = Auto_Ref->num_auto;
		Cond = Auto_Ref->cond_fils;
		premier = NON;
		while(Cond != NULL) {
			ajoute_liaison(Cond->cond,Cond->num_auto_fils,1,NON,Liste_Liaison);
			Cond = Cond->auto_fils_suivant;
		}
		Liaison = Liste_Liaison->premier;
		Niveau = 1;
		ajout =OUI;
		while(ajout) {
			ajout = NON;
			while(Liaison != NULL) {
				if(Liaison->niv == Niveau) {
					Cond = Liaison->cond_liaison;
					Auto_Fils = recherche_automate(Cond->num_auto_fils,Liste_ARS);
					Cond_Fils = Auto_Fils->cond_fils;
					while(Cond_Fils != NULL) {
						bzero(Nouv_Cond, LONG_MAX_COND);
						if(Cond->num_auto_fils != Liste_Liaison->num_auto_pere) {
							strcpy(Nouv_Cond,Mettre_And(Cond->cond,Cond_Fils->cond));	
							if(Cond->num_auto_fils == Cond_Fils->num_auto_fils) {				
								if(verification_BDD(Nouv_Cond)) {
									if(strcmp(Nouv_Cond, Cond->cond) != 0) {
										ajoute_liaison(Nouv_Cond, Cond->num_auto_fils, Liaison->niv, NON, Liste_Liaison);
										ajout = OUI;
										Liaison->supp = OUI;
									}
								}
								else Liaison->supp = OUI;
							}
							else {
								if(verification_BDD(Nouv_Cond)) {
									if(Cond_Fils->num_auto_fils != Liste_Liaison->num_auto_pere) {
										Liaison_rech = recherche_liaison(Nouv_Cond, Cond_Fils->num_auto_fils, Liste_Liaison);
										if(Liaison_rech != NULL) {
											if(Liaison_rech->supp != OUI) {
												ajoute_liaison(Nouv_Cond, Cond_Fils->num_auto_fils, (Liaison->niv)+1, NON, Liste_Liaison);
												ajout = OUI;
												Liaison->supp = OUI;
											}
											else
												Liaison->supp = OUI;
										}
										else {
											ajoute_liaison(Nouv_Cond, Cond_Fils->num_auto_fils, (Liaison->niv)+1, NON, Liste_Liaison);
											ajout = OUI;
											Liaison->supp = OUI;
										}
									}
									else {
										Et_Pere = Auto_Ref->peres;
										bzero(Liste_Peres,LONG_MAX_COND);
										while(Et_Pere != NULL) {
											if(strcmp(Liste_Peres,"") == 0)
												sprintf(Liste_Peres,"{ %d_%d",Et_Pere->num_gra,Et_Pere->num_pere);
											else {
												sprintf(Pere,", %d_%d",Et_Pere->num_gra,Et_Pere->num_pere);
												strcat(Liste_Peres,Pere);
											}
											Et_Pere = Et_Pere->pere_suivant;
										}
										strcat(Liste_Peres," }");
										if(premier == NON) {
											printf("\n\t!! --> cycle d'instabilite a partir de la situation %s avec la (ou les) condition(s) :\n\t\t\t\t'%s'\n", Liste_Peres, Nouv_Cond);
											premier = OUI;
										}
										else
											printf("\t\t\t\t'%s'\n", Nouv_Cond);
										Liaison->supp = OUI;
									}
								}
							}
						}
						Cond_Fils = Cond_Fils->auto_fils_suivant;
					}
				}
				Liaison = Liaison->liaison_suivante; 
			}
			Niveau ++;
			Liaison = Liste_Liaison->premier;
			/*affiche_liaison(Liste_Liaison);*/
		}
		Liaison = Liste_Liaison->premier;
		Auto_Ref->cond_fils = NULL;
		while(Liaison != NULL) {	/* On ajoute les liaisons trouvees dans l'automate de la liste_ARS */
			if(Liaison->supp == NON) {
				ajoute_cond_auto_fils(Liaison->cond_liaison->cond, Liaison->cond_liaison->num_auto_fils, Auto_Ref);
				if(!existance_etat(Liaison->cond_liaison->num_auto_fils,Liste_Etat))
					ajoute_etat(Liaison->cond_liaison->num_auto_fils, Liste_Etat);
			}
			Liaison = Liaison->liaison_suivante;
		}
		ajoute_automate(Auto_Ref->num_auto, Auto_Ref->peres, Auto_Ref->cond_fils, Liste_ARS_Complete);
		Etat_Ref = Etat_Ref->etat_suivant;
		Liste_Liaison->premier = NULL;
		Liste_Liaison->dernier = NULL;
		printf(".");
		fflush(stdout);	
	}
	printf("\n");
	return(Liste_ARS_Complete);
}


/*----------------------------------------------------------------------------*/
/*			const_liste_etape                                     */
/* description:								      */
/*		construit la liste contenant pour chaque etape la liste des   */
/*		etats ou elles sont actives				      */
/* parametres:								      */
/*		Liste_C	: pointeur sur la liste complete		      */
/*----------------------------------------------------------------------------*/
liste_automate *const_liste_etape(Liste_C)
liste_automate *Liste_C;
{
liste_automate *Liste_Etapes;
automate *Etape_Ref,
	 *Etape_Rech,
	 *Auto_Rech,
	 *Auto_Ref;
etapes_pere *Peres1;
int Num_Pere;

	Liste_Etapes = cree_liste_automate();
	Auto_Ref = Liste_C->premier;
	while(Auto_Ref != NULL)
	{
		Peres1 = Auto_Ref->peres;
		while(Peres1 != NULL)
		{
			Num_Pere = Peres1->num_pere;
			Etape_Rech = recherche_automate(Num_Pere, Liste_Etapes);
			if(Etape_Rech == NULL) {
				Etape_Ref = inst_automate(Num_Pere, NULL);
				Auto_Rech = Liste_C->premier;
				while(Auto_Rech != NULL) {
					if(existance_pere(Peres1->num_gra, Num_Pere, Auto_Rech->peres)) {
						ajoute_etapes_pere( Peres1->num_gra, Auto_Rech->num_auto, Etape_Ref);	
					}
					Auto_Rech = Auto_Rech->auto_suivant;
				}
				Etape_Ref = ajoute_automate(Etape_Ref->num_auto, Etape_Ref->peres, NULL, Liste_Etapes);
			}
			Liste_Etapes->premier->peres->num_gra = Peres1->num_gra;
			Peres1 = Peres1->pere_suivant;
		}
		Auto_Ref = Auto_Ref->auto_suivant;
	}
	return(Liste_Etapes);
}


/*----------------------------------------------------------------------------*/
/*			trans_fich_mec                                        */
/* description:								      */
/*		transforme la liste en format MEC dans deux fichiers fich_A   */
/*		fich_B.							      */
/* parametres:								      */
/*		Liste_Complete	: pointeur sur la liste			      */
/*		Liste_Etapes	: pointeur sur la liste des etapes	      */
/*		Nomprog		: nom du programme			      */
/*----------------------------------------------------------------------------*/
void trans_fich_mec(Liste_Complete, Liste_Etapes, Nomprog)
liste_automate *Liste_Complete,
	       *Liste_Etapes;
char *Nomprog;
{
int f1,f3,i,j,fin,Nb_Etats;
char temp[LONG_MAX_COND],
     temp2[LONG_MAX_COND],
     Nom[20];
automate *Auto,
	 *Etape;
etapes_pere *Etats;
etapes_pere *Liste_Pere;
cond_auto_fils *Cond_Fils;

char *Nom_de_f1 = (char *) calloc((unsigned)(strlen(Nomprog)+5),sizeof(char)) ;
char *Nom_de_f3 = (char *) calloc((unsigned)(strlen(Nomprog)+5),sizeof(char)) ;
char *carac =(char *) malloc(sizeof(char));

	/* creation des fichiers  */

	i = 0;
	sprintf(carac, "%c", *Nomprog);
	while ((strcmp(carac,".") != 0) && (strcmp(carac,"") != 0)) {
		strcat(Nom_de_f1,carac);
		strcat(Nom_de_f3,carac);
		Nomprog++;
		sprintf(carac, "%c", *Nomprog);

	}
	if ((strcmp(Nom_de_f1,"") == 0) || (strcmp(Nom_de_f3,"") == 0)) {
		strcat(Nom_de_f1,"Sans_Nom");
		strcat(Nom_de_f3,"Sans_Nom");
	}
	strcat(Nom_de_f1,".mec");
	strcat(Nom_de_f3,".mtr");
	if( ((f1 = creat(Nom_de_f1, PERMS)) == -1) || ((f3 = creat(Nom_de_f3, PERMS)) == -1) ) {
		printf("Ouverture des fichiers .mec et .mtr impossible\n");
		exit(0);
	}

	/* description de l'automate au format Mec.	*/
	/* Les transitions qui font boucler sont elimines et remplacees */
	/* par la transition e qui signifie tous les autres cas. 	*/

	bzero(temp, LONG_MAX_COND);
	bzero(Nom,20);
	i=0;
	fin = strlen(Nom_de_f1)-5;
	while (i<= fin){
		Nom[i] = *Nom_de_f1;
		Nom_de_f1++;
		i++;
	}
	sprintf(temp,"transition_system  %s     < width =        0 >;\n",Nom);
	write(f1, temp, strlen(temp));
	Auto = Liste_Complete->premier;
	while(Auto != NULL) {
		Cond_Fils = Auto->cond_fils;
		bzero(temp, LONG_MAX_COND);
		
                /* construction de la situation (liste d'etapes)     	*/
                /* representees par l'etat considere (Auto->num_auto) 	*/

                sprintf(temp, "%d   <",Auto->num_auto);
		write(f1, temp, strlen(temp));
                Liste_Pere = Auto->peres;

		while(Liste_Pere != NULL) 
  		{
			bzero(temp, LONG_MAX_COND);
                        if (Liste_Pere->pere_suivant != NULL)
      				{
				sprintf(temp, "e%d_%d; ", Liste_Pere->num_gra, Liste_Pere->num_pere);
				}
			        else 	
   				{
				sprintf(temp, "e%d_%d>\n", Liste_Pere->num_gra, Liste_Pere->num_pere);
				}
			/* endif */

			write(f1, temp, strlen(temp));
			Liste_Pere = Liste_Pere->pere_suivant;
		}
                
		/* construction des transitions partant de l'etat     	*/
		/* Auto->num_auto)
					*/
                sprintf(temp, "     |-");
		write(f1, temp, strlen(temp));	
        	i=0;
		while(Cond_Fils != NULL) 
		{
			if (Cond_Fils->num_auto_fils != Auto->num_auto) 
				{
				i++;
				bzero(temp, LONG_MAX_COND);
				bzero(temp2, LONG_MAX_COND);
				sprintf(temp, "\tT_%d_%d -> %d,\n", Auto->num_auto, i, Cond_Fils->num_auto_fils);
				sprintf(temp2, "T_%d_%d\t = %s\n", Auto->num_auto, i, Cond_Fils->cond);
				write(f1, temp, strlen(temp));
			  	write(f3, temp2, strlen(temp2));
				}
			Cond_Fils = Cond_Fils->auto_fils_suivant;
		}

		bzero(temp, LONG_MAX_COND);
		sprintf(temp, "\te -> %d;\n", Auto->num_auto);
		write(f1, temp, strlen(temp));
		Auto = Auto->auto_suivant;
	}


		/* Marquages des etats par les etapes */

	bzero(temp, LONG_MAX_COND);
	sprintf(temp, "<\n");
	write(f1, temp, strlen(temp));
	bzero(temp, LONG_MAX_COND);
	sprintf(temp, "initial = {%d};\n", Liste_Complete->premier->num_auto);
	write(f1, temp, strlen(temp));
	Etape = Liste_Etapes->premier;
	for(j=1; j<Liste_Etapes->longueur; j++) {
		bzero(temp, LONG_MAX_COND);
		sprintf(temp, "etape%d_%d\t= {", Etape->peres->num_gra, Etape->num_auto);
		Etats = Etape->peres;
		Nb_Etats = calcul_nb_peres(Etape);
		for(i=1; i<Nb_Etats; i++) {
			bzero(temp2, LONG_MAX_COND);
			sprintf(temp2, "%d, ", Etats->num_pere);		
			strcat(temp, temp2);
			Etats = Etats->pere_suivant;
		}
		bzero(temp2, LONG_MAX_COND);
		sprintf(temp2, "%d};\n", Etats->num_pere);			
		strcat(temp, temp2);
		write(f1, temp, strlen(temp));
		Etape = Etape->auto_suivant;
	}
	bzero(temp, LONG_MAX_COND);
	sprintf(temp, "etape%d_%d \t= {",Etape->peres->num_gra, Etape->num_auto);
	Etats = Etape->peres;
	Nb_Etats = calcul_nb_peres(Etape);
	for(i=1; i<Nb_Etats; i++) {
		bzero(temp2, LONG_MAX_COND);
		sprintf(temp2, "%d, ", Etats->num_pere);			
		strcat(temp, temp2);
		Etats = Etats->pere_suivant;
	}
	bzero(temp2, LONG_MAX_COND);
	sprintf(temp2, "%d}\n", Etats->num_pere);				
	strcat(temp, temp2);
	write(f1, temp, strlen(temp));
	Etape = Etape->auto_suivant;
	bzero(temp, LONG_MAX_COND);
	sprintf(temp, ">\n.\n");
	write(f1, temp, strlen(temp));
	close(f1);
	close(f3);

}

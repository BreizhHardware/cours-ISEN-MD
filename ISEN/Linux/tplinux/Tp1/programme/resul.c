/*----------------------------------------------------------------------------*/
/*				alloc.c					      */
/*									      */
/*	des transitions, et des identificateurs.			      */
/*----------------------------------------------------------------------------*/

#include "def.h"
#include "alloc.h"

/*----------------------------------------------------------------------------*/
/*                         void allocTabAct ()                                */
/*                                                                            */
/* description:                                                               */
/*      Cette fonction alloue l'espace memoire necessaire au stockage des     */
/*      noms des actions.                                                     */
/*                         						      */
/* parametres:                                                                */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void allocTabAct ()

{
	int i;

	
	for (i = 0; i <= MAX_VAR; i++)
		tabVar [i] = 0;
}


/*----------------------------------------------------------------------------*/
/*                         void allocTabVar ()                                */
/*                                                                            */
/* description:                                                               */
/*      Cette fonction alloue l'espace memoire necessaire au stockage des     */
/*      noms des variables.                                                   */
/*      (voir la fonction 'verifierVar ()' dans 'acces.c')                    */
/* parametres:                                                                */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void allocTabVar ()

{
	int i;

/*        tabVar = (Var **) malloc (sizeof (Var*) * (MAX_VAR + 1));	
*/
	for (i = 0; i <= MAX_VAR; i++)
		tabVar [i] = 0;
}

/*----------------------------------------------------------------------------*/
/*			   void allocTabIdent ()			      */
/*									      */
/* description:                                                               */
/*	Cette fonction alloue l'espace memoire necessaire au stockage des     */
/*	noms des ACTIONs et des RECEPTivites.				      */
/*	(voir la fonction 'verifierIdent ()' dans 'acces.c')		      */
/* parametres:                                                                */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void allocTabIdent ()

{
        int i;

 /*       tabIdent = (Ident **) malloc (sizeof (Ident*) * (MAX_IDENT + 1));
*/

        for (i = 0; i <= MAX_IDENT; i++)
                tabIdent [i] = 0;
}

/*----------------------------------------------------------------------------*/
/*			       void allocTabEt ()			      */
/*									      */
/* description:                                                               */
/*	Fonction identiques a la precedente pour les etapes.		      */
/*	(voir la fonction 'verifierEt ()' dans 'acces.c')		      */
/* parametres:                                                                */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void allocTabEt ()

{
	int i;

/*	tabEt = (Et **) malloc (sizeof (Et *) * (MAX_ET + 1));
*/
	for (i = 0; i <= MAX_ET; i++)
		tabEt [i] = 0;
}

/*----------------------------------------------------------------------------*/
/*			       void allocTabTr ()			      */
/*									      */
/* description:                                                               */
/*	Fonction identiques a la precedente pour les etapes.		      */
/*	(voir la fonction 'verifierTr ()' dans 'acces.c')		      */
/* parametres:                                                                */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void allocTabTr ()

{
	int i;

/*	tabTr = (Tr **) calloc (sizeof (Tr *) * (MAX_TR + 1));
*/
	for (i = 0; i <= MAX_TR; i++)
		tabTr [i] = 0;
}


/*----------------------------------------------------------------------------*/
/*			    void allocStrMemo ()			      */
/*									      */
/* description:                                                               */
/*	Initialisation des chaines de memorisation des variables normales, des*/
/*	variables d'etapes et des numeros d'etapes.			      */
/* parametres:                                                                */
/* modification:                                                              */
/*	Les chaines strVar, strEta et strRel contiennent des 0.	 	      */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void allocStrMemo ()

{
	int i;

	for (i = 0; i < MAX_STR; i++) {
		strVar [i] = 0;
		strEta [i] = 0;
		strRele [i] = 0;
		strReli [i] = 0;		
	}
}
/*----------------------------------------------------------------------------*/
/*                                 erreur.c                                   */
/*									      */
/*	Fichiers contenant les fonctions de stockage et d'affichage des       */
/*	erreurs.						              */
/*----------------------------------------------------------------------------*/

#include <stdio.h>
#include "def.h"
#include "erreur.h"

err tabErreur [MAX_ERREUR];
int nbErreur = 0;


/*----------------------------------------------------------------------------*/
/*				void afficheErreur ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affiche les erreurs contenues dans 'tabErreur[]'.             */
/* parametres:                                                                */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void afficheErreur (typeErreur)

{
	int i;
	char reponse = ' ';

	for (i = 0; i < nbErreur; i++)
		switch (tabErreur[i].err) {

		case TR_AP_LESS : 
			printf ("l'etape %s est une etape puits.\n",
				tabErreur[i].nom);
			break;
		case TR_AV_LESS : 
			printf ("l'etape %s est une etape source.\n",
				tabErreur[i].nom);
			break;
		case ET_AP_LESS : 
			printf ("manque etape apres pour la transition %s .\n",
				tabErreur[i].nom);
			break;
		case ET_AV_LESS : 
			printf ("manque etape apres pour la transition %s .\n",
				tabErreur[i].nom);
			break;
		case TR_AP_PRESENTE : 
			printf ("redefinition transition-apres l'etape %s.\n",
				tabErreur[i].nom);
			break;
		case TR_AV_PRESENTE : 
			printf ("redefinition transition-avant l'etape %s.\n",
				tabErreur[i].nom);
			break;
		case ET_AP_PRESENTE : 
			printf ("redefinition etape-apres la transition %s.\n",
				tabErreur[i].nom);
			break;
		case ET_AV_PRESENTE : 
			printf ("redefinition etape-avant la transition %s.\n",
				tabErreur[i].nom);
			break;
		case TR_PRESENTE : 
			printf ("redefinition transition %s.\n",tabErreur[i].nom);
			break;
		case ET_PRESENTE : 
			printf ("redefinition etape %s.\n",tabErreur[i].nom);
			break;
		case TAB_ET_PLEIN :
	 		printf ("Max etapes atteint (%d)\n", MAX_ET);
			printf ("(cf MAX_ET dans def.h)\n");
			break;
		case TAB_ET_AV_PLEIN :
			printf ("Max etape avant atteint (%d) pour la tr%s.\n",
				MAX_ET_AV_AP,tabErreur[i].nom);
			printf ("(cf MAX_ET_AV_AP dans def.h\n");
			break;
		case TAB_ET_AP_PLEIN :
			printf ("Max etape apres atteint (%d) pour la tr%s.\n",
				MAX_ET_AV_AP,tabErreur[i].nom);
			printf ("(cf MAX_ET_AV_AP dans def.h)\n");
			break;
		case TAB_TR_PLEIN : 
			printf ("Max transitions atteint (%d)\n",MAX_TR);
			printf ("(cf MAX_TR dans def.h)\n");
			break;
		case TAB_TR_AV_PLEIN :
			printf ("Max tr avant atteint (%d) pour l'etape %s.\n",
				MAX_TR_AV_AP,tabErreur[i].nom);
			printf ("(cf MAX_TR_AV_AP dans def.h)\n");
			break;
		case TAB_TR_AP_PLEIN :
			printf ("Max tr apres atteint (%d) pour l'etape %s.\n",
				MAX_TR_AV_AP,tabErreur[i].nom);
			printf ("(cf MAX_TR_AV_AP dans def.h)\n");
			break;
		case TAB_IDENT_PLEIN : 
			printf ("Max ident atteint (%d)\n",MAX_IDENT);
			printf ("(cf MAX_IDENT dans def.h)\n");
			break;
		case COND_FULL : 
			printf ("Condition %s trop longue (%d)\n",
				tabErreur[i].nom,MAX_LEN_COND);
			printf ("(cf MAX_LEN_COND dans def.h)\n");
			break;
		case ACT_UNDEF :
			printf ("action %s non definie\n",tabErreur[i].nom);
			break;
		case ACT_UNUSED :
			printf ("action %s non utilisee\n",tabErreur[i].nom);
			break;
		case REC_UNDEF :
			printf ("receptivite %s non definie\n",tabErreur[i].nom);
			break;
		case REC_UNUSED :
			printf ("receptivite %s non utilisee\n",tabErreur[i].nom);
			break;
		case ACT_REDECLARE :
			printf ("redeclaration de l'action %s\n",tabErreur[i].nom);
			break;
		case REC_REDECLARE :
			printf ("redeclaration de la receptivite %s\n",
				tabErreur[i].nom);
			break;
		case X_WITHOUT_DEC :
			printf ("utilisation de X%s sans declaration de l'etape %s\n",
				tabErreur[i].nom,tabErreur[i].nom);
			break;
		case TYPE_ARITH_FM :
			printf ("utilisation du front montant de la variable");
			printf (" arithmetique %s\n",tabErreur[i].nom);
			break;	
		case TYPE_ARITH_FD :
			printf ("utilisation du front descendant de la variable");
			printf (" arithmetique %s\n",tabErreur[i].nom);
			break;
		}

	if (typeErreur == FATALE) {
		printf ("\nErreur fatale !!\n\n");
		exit(0);
	}

	if (nbErreur) {
		while (reponse != 'o' && reponse != 'n') {
			printf ("\nVoulez-vous une traduction (o/n) ?");
			reponse = getchar ();
			if (reponse =='n') exit (0);
		}
	}
}

/*----------------------------------------------------------------------------*/
/*				void erreur ()				      */
/*                                                                            */
/* description:                                                               */
/*		Stocke l'erreur passee en parametre.			      */
/* parametres:                                                                */
/*		err	: numero de l'erreur.				      */
/*		nom	: message falcutatif (nom de receptivite, d'action...)*/
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void erreur (err,nom,gra)
int	err;
char	*nom,
	*gra;

{
char	*Nom;

	tabErreur [nbErreur].nom = (char *)malloc(sizeof(char) * MAX_LEN_IDENT);
	Nom = (char *)malloc(sizeof(char) * MAX_LEN_IDENT);
	tabErreur [nbErreur].err = err;
	if(strcmp(gra,"") != 0) {
		strcpy(Nom,gra);
		strcat(Nom,"_");
		strcat(Nom,nom);
	}
	else 
		Nom = nom;
	strcpy (tabErreur [nbErreur].nom,Nom);
	nbErreur++;

	if (nbErreur >= MAX_ERREUR) {
		afficheErreur (NORMAL);
		printf ("\nTrop d'erreur\n");
		exit (0);
	}
}

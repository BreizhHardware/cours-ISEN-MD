/*----------------------------------------------------------------------------*/
/*                                  proj.c                                    */
/*----------------------------------------------------------------------------*/

#include <stdio.h>
#include "def.h"
#include "acces.h"
#include "alloc.h"
#include "erreur.h"
#include "debug.h"
#include "lire.h"
#include "liste.h"

/* declaration des variables globales */

Et 	*tabEt[MAX_ET+1];
Tr	*tabTr[MAX_TR+1];
Ident 	*tabIdent[MAX_IDENT+1];
Var	*tabVar[MAX_VAR+1];
Act	*tabAct[MAX_STR+1]; 

char	strRele [MAX_STR];
char	strReli [MAX_STR];
char	strVar [MAX_STR];
char	strEta [MAX_STR];


/*----------------------------------------------------------------------------*/
/*				void banner ()				      */
/*									      */
/* description:								      */
/*		entete a l'execution du programme.			      */
/*									      */
/*----------------------------------------------------------------------------*/
void banner ()

{
printf ("===================================================================\n");
printf ("|           Compilateur Grafcet -> Automate          GRAFAUTO 2.0 |\n");
printf ("| 04/06/93      -        Equipe LIMI        -              BREST  |\n");
printf ("===================================================================\n\n");
}


/*----------------------------------------------------------------------------*/
/*			int lireParametre()				      */
/*									      */
/* description:								      */
/*		Cherche un parametre dans les parametres d'entree	      */
/*									      */
/*----------------------------------------------------------------------------*/
int lireParametre(argc, argv, param, nbAttendu)
int argc,
    nbAttendu;
char **argv,
     *param;
{
int i;
char *strParam = (char *) calloc (100,sizeof(char)),
     *res;

	for(i=2; i<argc; i++)
		ajoute(strParam," ",argv[i],0);

	if(res = strstr (strParam,param)) {
		if(nbAttendu)
			return atoi(res+1);
		else
			return 1;
	}
	return -1;
}


/*----------------------------------------------------------------------------*/
/*	                            main ()                                   */
/*                                                                            */
/*	Effectue :                                                            */
/*			- les allocations des principaux tableaux.            */
/*			- la lecture du fichier contenant le source grafcet.  */
/*			- la verification de la coherence du grafcet.         */
/*			- l'affichage des eventuelles erreurs.                */
/*			- la construction de la liste des automates atomiques */
/*			- la construction de la liste des automates de base   */
/*			- la construction de la liste des automates d'etats   */
/*			  finis complet.				      */
/*			- la transformation de l'automate en format MEC       */
/*----------------------------------------------------------------------------*/
main (argc, argv)
int argc;
char **argv;
{
liste_automate *Liste_Atomique,
	       *Liste_Base,
	       *Liste_Complete,
	       *Liste_ARS,
	       *Liste_Etapes;
BOOLEEN Trad_SRS; 
	
	banner();
	if (argc == 1) {
		printf ("GRAFAUTO nomfic [-][as]\n");
		exit (0);
	}

        if(stdin == (&_iob[0]))
	{
                if ((yyin = fopen ( argv[1] ,"r")) == NULL) {
                        printf ("Fichier parametre inaccessible!\n");
                        exit (1);
                }
	}
	else {
		printf ("Ne pas rediriger l'entree standard\n");
	    	printf ("GRAFAUTO nomfic [-][as]\n");
	    	exit (0);
	}

	printf ("-> Lecture\n");

	allocTabEt ();
	allocTabTr ();
	allocTabIdent ();
	allocTabVar ();
	allocStrMemo ();

	yyparse ();

	printf ("-> Verification\n");

	verifierTr (tabTr);
	/*afficheTabTr (tabTr);*/
	verifierEt (tabEt);
	/*afficheTabEt (tabEt);*/
	verifierIdent (tabIdent);
	/*afficheTabIdent (tabIdent);*/
	verifierVar (tabVar);
	/*afficheTabVar (tabVar);*/

	afficheErreur (NORMAL);

/**** Debut De GRAFAUTO *******/

	Trad_SRS = NON;
	if(lireParametre(argc,argv,"a",0) > 0)
		printf("\n-> Traduction ARS :");

	else if(lireParametre(argc,argv,"s",0) > 0) {
		printf("\n-> Traduction SRS :");
		Trad_SRS = OUI;
	}
	else
		printf("\n-> Traduction ARS :");
	printf("\n   **************\n");

/* Construction de la Liste Atomique */

	printf ("\n-> Liste_Atomique :\n");
	Liste_Atomique = construction_liste_atomique(tabTr);
	printf("\tlongueur Liste_Atomique :%d\n", Liste_Atomique->longueur);
	/*affiche_liste(Liste_Atomique);*/

/* Construction de la Liste de Base */

	printf ("\n\n-> Liste_Base :\n");
	Liste_Base = construction_liste_base(Liste_Atomique);
	printf("\tlongueur Liste_Base :%d\n", Liste_Base->longueur);
	/*affiche_liste(Liste_Base);*/

/* Construction de la Liste Complete */

system("pstat -s");
	printf ("\n\n-> Liste_Complete :\n");

	Liste_Complete = construction_liste_complete(tabEt, Liste_Base); 
	printf("\tlongueur Liste_Complete :%d\n", Liste_Complete->longueur);
	/*affiche_liste(Liste_Complete);*/

	 
/* Construction de la liste avec recherche de stabilite */

	if(!Trad_SRS) {
		printf ("\n\n-> Liste_ARS :\n");
		Liste_ARS = construction_liste_ARS(tabEt, tabTr, Liste_Complete);
		printf("\tlongueur Liste_ARS :%d\n", Liste_ARS->longueur);
		/*affiche_liste(Liste_ARS);*/
	}

/* Construction des fichiers de sortie sous format MEC  */

	if(Trad_SRS)
		Liste_Etapes = const_liste_etape(Liste_Complete);
	else
		Liste_Etapes = const_liste_etape(Liste_ARS);
	/*printf ("\n\n-> Liste_Etapes :\n");*/
	/*affiche_liste(Liste_Etapes);*/
	if(Trad_SRS)
		trans_fich_mec(Liste_Complete, Liste_Etapes,argv[1]);
	else
		trans_fich_mec(Liste_ARS, Liste_Etapes,argv[1]);

	free (strVar);
	free (strEta);
}

/*----------------------------------------------------------------------------*/
/*                                 debug.c                                    */
/*                                                                            */
/*	permet l'affichage des differents tableaux et listes.                 */
/*----------------------------------------------------------------------------*/

#include "def.h"
#include "acces.h"
#include "debug.h"


/*----------------------------------------------------------------------------*/
/*                              void afficheTabAct ()                         */
/*                                                                            */
/* description:                                                               */
/*              Affichage du tableau des actions.          		      */
/* parametres:                                                                */
/*              tabVar : adresse du tableau des variables.                    */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void afficheTabAct (tabAct)
Act **tabAct;

{
        printf ("\ntableau des Actions\n\n");
        while (*tabAct) {
                printf ("	Act:%s, type:%s,  cond:%s\n", (*tabAct)->nom,(*tabAct)->type,(*tabAct)->cond);
                tabAct++;
        }
}


/*----------------------------------------------------------------------------*/
/*                              void afficheTabVar ()                         */
/*                                                                            */
/* description:                                                               */
/*              Affichage du tableau des variables des receptivites.          */
/* parametres:                                                                */
/*              tabVar : adresse du tableau des variables.                    */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void afficheTabVar (tabVar)
Var **tabVar;

{
        printf ("\ntableau des Var\n\n");
        while (*tabVar) {
                printf ("Var %s : %d_%d\n", (*tabVar) -> nom,(*tabVar)->type,(*tabVar)->IO);
                tabVar++;
        }
}

/*----------------------------------------------------------------------------*/
/*				void afficheTabIdent ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affichage du tableau des identificateurs d'actions et de      */
/*		receptivites.						      */
/* parametres:                                                                */
/*		tabIdent : adresse du tableau d'identificateurs.	      */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void afficheTabIdent (tabIdent)
Ident **tabIdent;

{
	printf ("\ntableau des Ident\n\n");
	while (*tabIdent) {
		printf ("ident %s %d %d '%s'\n",
		    (*tabIdent) -> ident,(*tabIdent) -> flag,(*tabIdent)->type,(*tabIdent)->cont);
		tabIdent++;
	}
}

/*----------------------------------------------------------------------------*/
/*				void afficheTabEt ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affichage des etapes.					      */
/* parametres:                                                                */
/*		tabEt	: adresse du tableau des etapes.		      */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void afficheTabEt (tabEt)
Et **tabEt;

{
	printf ("\ntableau des etapes\n\n");
	while (*tabEt) {
		printf ("etape %d_%d\n",(*tabEt) -> gra,(*tabEt) -> num);
		printf ("	type : %d\n",(*tabEt) -> type);
		listeTrAv ((*tabEt)->trAvant);
		listeTrAp ((*tabEt)->trApres);
		tabEt++;
	}
}

/*----------------------------------------------------------------------------*/
/*				void afficheTabTr ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affichage du tableau des transitions.			      */
/* parametres:                                                                */
/*		tabTr	: adresse du tableau des transitions.                 */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void afficheTabTr (tabTr)
Tr **tabTr;

{
	printf ("\ntableau des transitions\n\n");
	while (*tabTr) {
		printf ("transition %d\n",(*tabTr) -> num);
		printf ("	condition : %s\n",(*tabTr) -> condition);
		listeEtAv ((*tabTr)->etAvant);
		listeEtAp ((*tabTr)->etApres);
		tabTr++;
	}
}


/*----------------------------------------------------------------------------*/
/*				void listeAct ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affiche le tableau d'actions associees a une etape 	      */
/*		 							      */
/* parametres:                                                                */
/*		tabAct	: pointeur sur le tableau d'action.		      */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void listeAct (tabAct)
Act **tabAct;

{
	printf("        Act ");
	while (tabAct) {
		printf("%s",(*tabAct)->nom);
		tabAct++;
	}
	printf("\n");
}


/*----------------------------------------------------------------------------*/
/*				void listeEtAv ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affichage de la liste des "etapes avant" contenues dans le    */
/*		tableau 'ptrEtAv' passe en parametre.			      */
/* parametres:                                                                */
/*		ptrEtAv	: pointeur du tableau de pointeur des "etapes avant". */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void listeEtAv (ptrEtAv)
Et **ptrEtAv;

{
	printf("        et avant (%d):",nbEt (ptrEtAv));
	while (*ptrEtAv) {
		printf("%d_%d ",(*(ptrEtAv))->gra, (*(ptrEtAv))->num);
		ptrEtAv++;
	}
	printf("\n");
}

/*----------------------------------------------------------------------------*/
/*				void listeEtAp ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affichage de la liste des "etapes apres" contenues dans le    */
/*		tableau 'ptrEtAp'.					      */
/* parametres:                                                                */
/*		ptrEtAp	: pointeur du tableau de pointeurs des "etapes apres".*/
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void listeEtAp (ptrEtAp)
Et **ptrEtAp;

{
	printf("        et apres (%d):",nbEt (ptrEtAp));
	while (*ptrEtAp) {
		printf("%d_%d ",(*(ptrEtAp))->gra, (*(ptrEtAp))->num);
		ptrEtAp++;
	}
	printf("\n");
}

/*----------------------------------------------------------------------------*/
/*				void listeTrAp ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affichage de la liste des "transitions apres" contenues dans  */
/*		le tableau 'ptrTrAp'.					      */
/* parametres:                                                                */
/*		ptrTrAp : pointeur du tableau de pointeurs des "transitions   */
/*			  apres".					      */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void listeTrAp (ptrTrAp)
Tr **ptrTrAp;

{
	printf("        tr apres :");
	while (*ptrTrAp) {
		printf("%d ",(*(ptrTrAp))->num);
		ptrTrAp++;
	}
	printf("\n");
}

/*----------------------------------------------------------------------------*/
/*				void listeTrAv ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affichage de la liste des "transitions avant" contenues dans  */
/*		le tableau 'ptrTrAv'.				   	      */
/* parametres:                                                                */
/*		ptrTrAv : pointeur du tableau de pointeurs des "transitions   */
/*			  avant".					      */
/* modification:                                                              */
/* retour:                                                                    */
/*----------------------------------------------------------------------------*/
void listeTrAv (ptrTrAv)
Tr **ptrTrAv;

{
	printf("        tr avant :");
	while (*ptrTrAv) {
		printf("%d ", (*(ptrTrAv))->num);
		ptrTrAv++;
	}
	printf("\n");
}

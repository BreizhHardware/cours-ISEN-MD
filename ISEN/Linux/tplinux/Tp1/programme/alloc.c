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

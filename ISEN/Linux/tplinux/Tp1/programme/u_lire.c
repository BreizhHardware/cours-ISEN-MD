/*----------------------------------------------------------------------------*/
/*				u_lire.c          			      */
/*									      */
/*	contient les fonctions utilitaires necessaire au fonctionnement de    */
/* l'analyse syntaxique.						      */
/*----------------------------------------------------------------------------*/

#include <varargs.h>
#include <ctype.h>
#include "def.h"
#include "alloc.h"
#include "erreur.h"
#include "lire.h"
#include "acces.h"
#include "y.tab.h"

/*----------------------------------------------------------------------------*/
/*			void controlTypeEtape  ()			      */
/*                                                                            */
/* description:                                                               */
/*		controle si le type de l'etape est valide.		      */
/* entrees:                                                                   */
/*		type 	: type de l'etape .                                   */
/*		                                                              */
/* retour:                                                                    */
/*									      */
/*----------------------------------------------------------------------------*/
void controlTypeEtape  (type)
char *type;

{
	if (strcmp (type,"N") && strcmp (type,"C") && strcmp (type,"R") && strcmp (type,"S") && strcmp (type,"P")) {
		erreur (TYPE_ETAPE,type);
		afficheErreur (FATALE);
	}
}


/*----------------------------------------------------------------------------*/
/*				char *affecte ()			      */
/*                                                                            */
/* description:                                                               */
/*		Affecte a la premiere chaine de la liste de parametres, le    */
/*		second parametre et concatene ensuite les autres chaines      */
/*		presentes dans la liste de parametres variable.		      */
/* parametres:                                                                */
/*		va_alist : declaration d'une liste de parametres variable.    */
/* modification:                                                              */
/*		Le premier parametre est modifie.			      */
/* retour:                                                                    */
/*		Renvoie la chaine finale.				      */
/*----------------------------------------------------------------------------*/
char *affecte (va_alist)
va_dcl

{
	va_list ap;
	char	*s1,*s2;

	va_start (ap);
	s1 = va_arg (ap,char *);
	s2 = va_arg (ap,char *);
	strcpy (s1,s2);
	while ((s2 = va_arg (ap,char *)) != (char *)0)
		strcat (s1,s2);
	va_end (ap);
	return s1;
}

/*----------------------------------------------------------------------------*/
/*				char *ajoute ()				      */
/*                                                                            */
/* description:                                                               */
/*		Ajoute a la premiere chaine de la liste de parametres, le     */
/*		second parametre et concatene ensuite les autres chaines      */
/*		presentes dans la liste de parametres variable.		      */
/* parametres:                                                                */
/*		va_alist : declaration d'une liste de parametres variable.    */
/* modification:                                                              */
/*		Le premier parametre est modifie.			      */
/* retour:                                                                    */
/*		Renvoie la chaine finale.				      */
/*----------------------------------------------------------------------------*/
char *ajoute (va_alist)
va_dcl

{
        va_list ap;
        char    *s1,*s2;

        va_start (ap);
        s1 = va_arg (ap,char *);
        while ((s2 = va_arg (ap,char *)) != (char *)0) {
                strcat (s1,s2);
	}
        va_end (ap);
	return s1;
}

/*----------------------------------------------------------------------------*/
/*				int typeLO ()				      */
/*                                                                            */
/* description:                                                               */
/*		Teste si les types d'expressions passes en parametre sont     */
/*		differents du type AR (expression ARithmetique).	      */
/* parametres:                                                                */
/*		t1	: type d'expression.				      */
/*		t2	: type d'expression.			 	      */
/* modification:                                                              */
/* retour:                                                                    */
/*		Retourne 1 si un des deux types egal AR,		      */
/*		0 sinon.						      */
/*----------------------------------------------------------------------------*/
int typeLO (t1,t2)
int t1,t2;

{
        if (t1 == AR || t2 == AR) return 0;
        else return 1;
}

/*----------------------------------------------------------------------------*/
/*                              int typeAR ()                                 */
/*                                                                            */
/* description:                                                               */
/*              Teste si les types d'expressions passes en parametre sont     */
/*              differents du type LO (expression LOgique).                   */
/* parametres:                                                                */
/*              t1      : type d'expression.                                  */
/*              t2      : type d'expression.                                  */
/* modification:                                                              */
/* retour:                                                                    */
/*              Retourne 1 si un des deux types egal LO,                      */
/*              0 sinon.                                                      */
/*----------------------------------------------------------------------------*/
int typeAR (t1,t2)
int t1,t2;

{
        if (t1 == LO || t2 == LO) return 0;
        else return 1;
}


/*----------------------------------------------------------------------------*/
/*                              int nbToken (expr)                            */
/*                                                                            */
/* description:                                                               */
/*              Renvoie le nombre de sous_chaine d'une chaine. Deux           */
/*              sous_chaines sont separees par un ou plusieurs blancs.        */
/* parametres:                                                                */
/*              expr	: expression a analyser.                              */
/*              			                                      */
/* modification:                                                              */
/* retour:                                                                    */
/*              Retourne le nombre de token (sous_chaine) contenu dans        */
/*              expr.                                                         */
/*----------------------------------------------------------------------------*/
int nbToken (expr)
char *expr;
{
	int nbTok = 0;
	char tok [MAX_STR];

	while (sscanf (expr, "%s",tok) != EOF) {
		nbTok++;
		expr = strstr (expr,tok) + strlen (tok);
	}
	return nbTok;
}



/*----------------------------------------------------------------------------*/
/*				attr *ajouteParenthese ()		      */
/*                                                                            */
/* description:                                                               */
/*		Creee et remplis les champs d'un attribut. Son type est celui */
/*		de l'expression passee en parametre, son contenu (champs cont)*/
/*		est la concatenation de '(', du champs cont de l'expression   */
/*		de ')'.							      */
/* parametres:                                                                */
/*		expr	: attribut de l'expression.			      */
/* modification:                                                              */
/* retour:                                                                    */
/*		retourne l'attribut cree.				      */
/*----------------------------------------------------------------------------*/
attr *ajouteParenthese (expr)		
attr expr;

{
	attr at;

	at.type = expr.type;
	if (nbToken (expr.cont) > 1)
		affecte (at.cont,"( ",expr.cont," )",0);
	else	affecte (at.cont,expr.cont,0);

	if (nbToken (expr.cont) > 1)
		affecte (at.ctSf,"( ",expr.ctSf," )",0);
	else	affecte (at.ctSf,expr.ctSf,0);

	return &at;
}

/*----------------------------------------------------------------------------*/
/*				attr *ajouteOpArith ()			      */
/*                                                                            */
/* description:                                                               */
/*		Creee et remplis les champs d'un attribut avec le contenu des */
/*		attributs expr* passes en parametre, si ces derniers          */
/*		correspondent au type ARithmetique.			      */
/*		Le type de l'attribut cree est AR.			      */
/* parametres:                                                                */
/*		expr1	: attribut de l'expression situee a gauche de         */
/*			  l'operateur arithmetique.			      */
/*		opArith : operateur arithmtique considere.		      */
/*		expr2	: attribut de l'expression situee a droite de         */
/*                        l'operateur arithmetique.                           */
/* modification:                                                              */
/* retour:                                                                    */
/*              retourne l'attribut cree.                                     */
/*----------------------------------------------------------------------------*/
attr *ajouteOpArith (expr1,opArith,expr2)
attr expr1,expr2;
int  opArith;

{
	attr *at = (attr *) malloc (sizeof (attr));

	if (!typeAR (expr1.type,expr2.type))
		switch (opArith) {

		case ADD :
			yyerror (ERR_TYPE_ADD);
			break;
		case SUB :
			yyerror (ERR_TYPE_SUB);
			break;
		case MUL :
			yyerror (ERR_TYPE_MUL);
			break;
		case DIV :
			yyerror (ERR_TYPE_DIV);
			break;
		case EXP :
			yyerror (ERR_TYPE_EXP);
			break;
		case MOD :
			yyerror (ERR_TYPE_MOD);
			break;
		}
	at -> type = AR;

	switch (opArith) {

	case ADD :
		affecte (at -> cont,expr1.cont," + ",expr2.cont,0);
		affecte (at -> ctSf,expr1.ctSf," + ",expr2.ctSf,0);
		break;
	case SUB :
		affecte (at -> cont,expr1.cont," - ",expr2.cont,0);
		affecte (at -> ctSf,expr1.ctSf," - ",expr2.ctSf,0);
		break;
	case MUL :
		affecte (at->cont,expr1.cont," * ",expr2.cont,0);
		affecte (at->ctSf,expr1.ctSf," * ",expr2.ctSf,0);
		break;
	case DIV :
		affecte (at -> cont,expr1.cont," / ",expr2.cont,0);
		affecte (at -> ctSf,expr1.ctSf," / ",expr2.ctSf,0);
		break;
	case EXP :
		affecte (at -> cont,expr1.cont,"**",expr2.cont,0);
		affecte (at -> ctSf,expr1.ctSf,"**",expr2.ctSf,0);
		break;
	case MOD :
		affecte (at -> cont,expr1.cont," MOD ",expr2.cont,0);
		affecte (at -> ctSf,expr1.ctSf," MOD ",expr2.ctSf,0);
		break;
	}

	return at;
}

/*----------------------------------------------------------------------------*/
/*				int detectEdge (chaine)			      */
/*                                                                            */
/* description:                                                               */
/*		Detecte si il y a un front dans une chaine.		      */
/* parametres:                                                                */
/*		Chaine a tester.					      */
/* modification:                                                              */
/* retour:                                                                    */
/*		Renvoie 1 si il y a un front				      */
/*			0 sinon.					      */
/*----------------------------------------------------------------------------*/
int detectEdge (chaine)
char *chaine;

{
	char *cop;
	cop = strdup (chaine);
	if (strcmp (strtok (cop,"!"),chaine)) {
		free (cop);
		return 1;
	}
	free (cop);
        return 0;
}

/*----------------------------------------------------------------------------*/
/*                              attr *ajouteOpLogiq ()                        */
/*                                                                            */
/* description:                                                               */
/*              Creee et remplis les champs d'un attribut avec le contenu des */
/*              attributs expr* passes en parametre, si ces derniers          */
/*              correspondent au type LOgique.                                */
/*              Le type de l'attribut cree est LO.                            */
/* parametres:                                                                */
/*              expr1   : attribut de l'expression situee a gauche de         */
/*                        l'operateur logique.                                */
/*              opLogiq : operateur logique considere.                        */
/*              expr2   : attribut de l'expression situee a droite de         */
/*                        l'operateur logique.                                */
/* modification:                                                              */
/* retour:                                                                    */
/*              retourne l'attribut cree.                                     */
/*----------------------------------------------------------------------------*/
attr *ajouteOpLogiq (expr1,opLogiq,expr2)		
attr expr1,expr2;
int  opLogiq;

{
	attr at;

	if (!typeLO (expr1.type,expr2.type))
		switch (opLogiq) {

		case OR :
			yyerror (ERR_TYPE_OR);
			break;
                case XOR :
                        yyerror (ERR_TYPE_XOR);
                        break;
                case AND :
                        yyerror (ERR_TYPE_AND);
                        break;
                }
        at.type = LO;

        switch (opLogiq) {

        case OR :
/**		verifType (expr1,opLogiq,expr2);		**/
                affecte (at.cont,expr1.cont," or ",expr2.cont,0);
		affecte (at.ctSf,expr1.ctSf," or ",expr2.ctSf,0);
		if (!strcmp (expr1.ctSf,"true") || !strcmp (expr2.ctSf,"true"))
			strcpy (at.ctSf,"true");
		if (!strcmp (expr1.ctSf,"false"))
			strcpy (at.ctSf,expr2.ctSf);
		if (!strcmp (expr2.ctSf,""))
			strcpy (at.ctSf,expr1.ctSf);
                break;
        case XOR :
/**		verifType (expr1,opLogiq,expr2);		**/
                affecte (at.cont,expr1.cont," xor ",expr2.cont,0);
                affecte (at.ctSf,expr1.ctSf," xor ",expr2.ctSf,0);
                break;
        case AND :
/**		verifType (expr1,opLogiq,expr2);		**/
                affecte (at.cont,expr1.cont," and ",expr2.cont,0);
		if (!strcmp (expr1.ctSf,"false") || !strcmp (expr2.ctSf,"false"))
			strcpy (at.ctSf,"false");
		else {
			if (!strcmp (expr1.ctSf,"true"))
				strcpy (at.ctSf,expr2.ctSf);
			else {
				if (!strcmp (expr2.ctSf,"true"))
					strcpy (at.ctSf,expr1.ctSf);
				else	
					affecte (at.ctSf,expr1.ctSf," and ",expr2.ctSf,0);
			}
		}
		break;
        }
	return &at;
}

/*----------------------------------------------------------------------------*/
/*           int expressionArithFalse (expr1,comp,expr2)                      */
/*                                                                            */
/* description:                                                               */
/*              Detecte si deux expressions autour d'une comparaison          */
/*              arithmetique sont de type arithmetique                        */
/*              			                                      */
/*               				                              */
/* entrees:                                                                   */
/*              expr1,expr2   	: les 2 expressions                           */
/*              comp		: l'operateur.				      */
/* sorties:								      */
/* 		retourne 	0 si erreur de type,                          */
/*				1 si les 2 chiffres sont differents	      */
/*				0 si il sont identiques .		      */
/*----------------------------------------------------------------------------*/
int expressionArithFalse (expr1,comp,expr2)
attr expr1,expr2;

{
	int chif1,chif2;

	if (expr1.type != AR || expr2.type != AR) return 0;

	sscanf (expr1.cont,"%d",&chif1);
	sscanf (expr2.cont,"%d",&chif2);

	if (chif1 != chif2) return 1;
	return 0;
}

/*----------------------------------------------------------------------------*/
/*                              attr *ajouteComp ()                           */
/*                                                                            */
/* description:                                                               */
/*              Creee et remplis les champs d'un attribut avec le contenu des */
/*              attributs expr* passes en parametre, si ces derniers          */
/*              correspondent au type LOgique.                                */
/*              Le type de l'attribut cree est LO.                            */
/* parametres:                                                                */
/*              expr1   : attribut de l'expression situee a gauche de         */
/*                        comparateur logique.                                */
/*              comp	: operateur logique considere.                        */
/*              expr2   : attribut de l'expression situee a droite de         */
/*                        comparateur logique.                                */
/* modification:                                                              */
/* retour:                                                                    */
/*              retourne l'attribut cree.                                     */
/*----------------------------------------------------------------------------*/
attr *ajouteComp (expr1,comp,expr2)		
attr expr1,expr2;
int  comp;

{
        attr at;

        if (!typeLO (expr1.type,expr2.type) && !typeAR (expr1.type,expr2.type))
                switch (comp) {

                case EQUAL :
                        yyerror (ERR_TYPE_EQUAL);
                        break;
                case NO_EQ :
                        yyerror (ERR_TYPE_NO_EQ);
                        break;
                }
        at.type = LO;

        switch (comp) {

        case EQUAL :
		if (strcmp (expr1.cont,expr2.cont)) {
			if (expressionArithFalse (expr1,EQUAL,expr2)) {
				affecte (at.cont,"false",0);
				affecte (at.cont,"false",0);
			}
			else {
/**				verifType (expr1,comp,expr2);		**/
                		affecte (at.cont,expr1.cont," = ",expr2.cont,0);
                		affecte (at.ctSf,expr1.ctSf," = ",expr2.ctSf,0);
			}
		}
		else {
			affecte (at.cont,"true",0);
			affecte (at.cont,"true",0);
		}
		break;
        case NO_EQ :
		if (strcmp (expr1.cont,expr2.cont)) {
			if (expressionArithFalse (expr1,NO_EQ,expr2)) {
				affecte (at.cont,"true",0);
				affecte (at.cont,"true",0);
			}
			else {
/**				verifType (expr1,comp,expr2);		**/
				affecte (at.cont,expr1.cont," /= ",expr2.cont,0);
                		affecte (at.ctSf,expr1.ctSf," /= ",expr2.ctSf,0);
			}
		}
		else {
			affecte (at.cont,"false",0);
			affecte (at.cont,"false",0);
		}
                break;
        }
	return &at;
}


/*----------------------------------------------------------------------------*/
/*                            attr *ajouteCompArith ()                        */
/*                                                                            */
/* description:                                                               */
/*              Creee et remplis les champs d'un attribut avec le contenu des */
/*              attributs expr* passes en parametre, si ces derniers          */
/*              correspondent au type ARithmetique.                           */
/*              Le type de l'attribut cree est LO.                            */
/* parametres:                                                                */
/*              expr1     : attribut de l'expression situee a gauche du       */
/*                          comparateur arithmetique.                         */
/*              compArith : operateur logique considere.                      */
/*              expr2     : attribut de l'expression situee a droite du       */
/*                          comparateur arithmetique.                         */
/* modification:                                                              */
/* retour:                                                                    */
/*              retourne l'attribut cree.                                     */
/*----------------------------------------------------------------------------*/
attr *ajouteCompArith (expr1,compArith,expr2)		
attr expr1,expr2;
int  compArith;

{
        attr at;

        if (!typeAR (expr1.type,expr2.type))
                switch (compArith) {

                case INF_S :
                        yyerror (ERR_TYPE_INF_S);
                        break;
                case SUP_S :
                        yyerror (ERR_TYPE_SUP_S);
                        break;
                case INF_E :
                        yyerror (ERR_TYPE_INF_E);
                        break;
                case SUP_E :
                        yyerror (ERR_TYPE_SUP_E);
                        break;
                }
        at.type = LO;

        switch (compArith) {

        case INF_S :
                affecte (at.cont,expr1.cont," < ",expr2.cont,0);
                affecte (at.ctSf,expr1.ctSf," < ",expr2.ctSf,0);
                break;
        case SUP_S :
                affecte (at.cont,expr1.cont," > ",expr2.cont,0);
                affecte (at.ctSf,expr1.ctSf," > ",expr2.ctSf,0);
                break;
        case INF_E :
                affecte (at.cont,expr1.cont," <= ",expr2.cont,0);
                affecte (at.ctSf,expr1.ctSf," <= ",expr2.ctSf,0);
                break;
        case SUP_E :
                affecte (at.cont,expr1.cont," >= ",expr2.cont,0);
                affecte (at.ctSf,expr1.ctSf," >= ",expr2.ctSf,0);
                break;
        }

        return &at;
}

/*----------------------------------------------------------------------------*/
/*                              attr *ajouteMoinsUnaire ()                    */
/*                                                                            */
/* description:                                                               */
/*              Creee et remplis les champs d'un attribut avec le contenu de  */
/*              attribut expr passe en parametre, si ce dernier correspond au */
/*		type ARithmetique.                                            */
/*              Le type de l'attribut cree est AR.                            */
/* parametres:                                                                */
/*              expr     : attribut de l'expression situee a droite du        */
/*                         operateur arithmetique.                            */
/* modification:                                                              */
/* retour:                                                                    */
/*              retourne l'attribut cree.                                     */
/*----------------------------------------------------------------------------*/
attr *ajouteMoinsUnaire (expr)		
attr expr;

{
        attr at;

	if (!typeAR (PI,expr.type))
		yyerror (ERR_TYPE_MU);
	at.type = AR;
	affecte (at.cont," -",expr.cont,0);
	affecte (at.ctSf," -",expr.ctSf,0);

	return &at;
}

/*----------------------------------------------------------------------------*/
/*                              attr *ajouteNot ()                            */
/*                                                                            */
/* description:                                                               */
/*              Creee et remplis les champs d'un attribut avec le contenu de  */
/*              attribut expr passe en parametre, si ce dernier correspond au */
/*              type LOgique.                                                 */
/*              Le type de l'attribut cree est LO.                            */
/* parametres:                                                                */
/*              expr     : attribut de l'expression situee a droite du        */
/*                         operateur logique.                                 */
/* modification:                                                              */
/* retour:                                                                    */
/*              retourne l'attribut cree.                                     */
/*----------------------------------------------------------------------------*/
attr *ajouteNot (expr)		
attr expr;

{
        attr at ;

	if (!typeLO (PI,expr.type))
		yyerror (ERR_TYPE_NOT);
	at.type = LO;
/**	verifType (0,NOT,expr);				**/
	affecte (at.cont," not ",expr.cont,0);
	affecte (at.ctSf," not ",expr.ctSf,0);
	if (!strcmp(expr.ctSf,"true")) affecte (at.ctSf,"false",0);
	if (!strcmp(expr.ctSf,"false")) affecte (at.ctSf,"true",0);

	return &at;
}


/*----------------------------------------------------------------------------*/
/*                              char *analyseExpression (expr)                */
/*                                                                            */
/* description:                                                               */
/*              Permet l'analyse d'une expression se trouvant dans les        */
/*              parentheses d'un front  (ex;  !R(a or b)                      */
/*             					                              */
/* parametres:                                                                */
/*              expr     : expression a analyser    	   	              */
/*                         		                                      */
/* modification:                                                              */
/* retour:                                                                    */
/*              			                                      */
/*----------------------------------------------------------------------------*/
char *analyseExpression (expr)
char *expr;

{
	char tok [MAX_LEN_VAR];

	while (sscanf (expr,"%s",tok) != EOF)
		expr = strstr (expr,tok) + strlen (tok);
	return tok;
}

/*----------------------------------------------------------------------------*/
/*                              attr *ajouteEdge ()                           */
/*                                                                            */
/* description:                                                               */
/*		Cree un attribut contenant dans son champ cont, l'ident       */
/*		precede de front (montant '!R'ou descendant '!F')             */
/*              Le type de l'attribut cree est LO.                            */
/* parametres:                                                                */
/*		front	: pointeur sur la chaine contenant le front.  	      */
/*		ident	: pointeur sur la chaine contenant l'identificateur.  */
/* modification:                                                              */
/* retour:                                                                    */
/*              retourne l'attribut cree.                                     */
/*----------------------------------------------------------------------------*/
attr *ajouteEdge (front,ident)		
char *front,*ident;

{
	Var *var;
	attr at;
	

	at.type = LO;
	affecte (at.cont,front,ident,0);
	strcpy (at.ctSf,"false");

	switch (front[1]) {

	case 'R' :
		if (ident [0] == '(') analyseExpression (ident);
		else { if (var = lireVar (strToUpper (ident),_INTEG,tabVar)) {
				erreur (TYPE_ARITH_FM,var->nom);
				afficheErreur (FATALE);
			}
			if (!(var = lireVar (strToUpper (ident),_FREDGE,tabVar))) {
                    		if (var = lireVar (strToUpper (ident),_FEDGE,tabVar))
                         		var -> type = _FREDGE;
                    		else ajouterVar (strToUpper (ident),tabVar,_REDGE);
			}
		}
		break;
	case 'F' :
		if (ident [0] == '(') analyseExpression (ident);
		else { if (var = lireVar (strToUpper (ident),_INTEG,tabVar)) {
				erreur (TYPE_ARITH_FD,var->nom);
				afficheErreur (FATALE);
			}
			if (!(var = lireVar (strToUpper (ident),_FREDGE,tabVar))) {
		    		if (var = lireVar (strToUpper (ident),_REDGE,tabVar))
			 		var -> type = _FREDGE;
		    	else ajouterVar (strToUpper (ident),tabVar,_FEDGE);
			}
		}
		break;
	}

	return &at;
}

/*----------------------------------------------------------------------------*/
/*				char *itoa ()				      */
/*                                                                            */
/* description:                                                               */
/*		Effectue la conversion d'un entier en chaine de caracteres.   */
/* parametres:                                                                */
/*		Nb	: entier a convertir.				      */
/* modification:                                                              */
/* retour:                                                                    */
/*		Retourne un pointeur sur la chaine creee.		      */
/*----------------------------------------------------------------------------*/
char *itoa (nb)		
int nb;

{
	char *str = (char *) malloc (sizeof (char) * 20);

	sprintf (str,"%d",nb);

	return str;
}

/*----------------------------------------------------------------------------*/
/*                             char *strToUpper (str)                         */
/* description:                                                               */
/*		Transforme une chaine en majuscule.			      */
/* parametres:                                                                */
/*		str	: chaine a transformer.				      */
/* modification:                                                              */
/* retour:                                                                    */
/*		Renvoie la chaine en majuscule.				      */
/*----------------------------------------------------------------------------*/
char *strToUpper (str)		
char *str;

{
        char *copie;
	char *copCopie;

	copie = strdup (str);
	copCopie = copie;

        while (*copie) {
		if (!isupper (*copie) && !(isdigit (*copie)) && !ispunct (*copie)) *copie = *copie - 0x20;
                copie++;
        }
        return copCopie;
}

/*----------------------------------------------------------------------------*/
/*                             char *strToLower (str)                         */
/*                                                                            */
/* description:                                                               */
/*		Transforme une chaine en minuscule.			      */
/* parametres:                                                                */
/*		str	: chaine a transformer.				      */
/* modification:                                                              */
/* retour:                                                                    */
/*		Renvoie la chaine en minuscule.				      */
/*----------------------------------------------------------------------------*/
char *strToLower (str)
char *str;

{
        char *copie;
	char *copCopie;

	copie = strdup (str);
	copCopie = copie;

        while (*copie) {
                if (!islower (*copie) && !(isdigit (*copie))) *copie = *copie + 0x20;
                copie++;
        }
        return copCopie;
}

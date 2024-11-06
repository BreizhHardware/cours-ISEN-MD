extern char *malloc(), *realloc();

# line 7 "lire.y"
#include "def.h"
#include "alloc.h"
#include "acces.h"
#include "debug.h"
#include "erreur.h"
#include "lire.h"

char typeAct;
int typeCourant;
int lectAct =0;
int iTabNum = 0;
int tabNum [MAX_INT_MEMO];
int et,gr,tr;			

# define TRUE 257
# define FALSE 258
# define IS 259
# define NS 260
# define MS 261
# define BMS 262
# define EMS 263
# define ES 264
# define TR 265
# define FR 266
# define TO 267
# define ET 268
# define AFFECT 269
# define RE 270
# define ER 271
# define AC 272
# define EA 273
# define OR 274
# define XOR 275
# define AND 276
# define INF_S 277
# define SUP_S 278
# define INF_E 279
# define SUP_E 280
# define EQUAL 281
# define NO_EQ 282
# define ADD 283
# define SUB 284
# define MUL 285
# define EXP 286
# define DIV 287
# define MOD 288
# define NOT 289
# define FM 290
# define FD 291
# define IF 292
# define TYPE 293
# define ENDT 294
# define INT 295
# define BOOL 296
# define BODY 297
# define ENDB 298
# define RELET 299
# define IDENTIFIER 300
# define INTEGER 301
# define REAL 302
# define UMINUS 303
#define yyclearin yychar = -1
#define yyerrok yyerrflag = 0
extern int yychar;
extern int yyerrflag;
#ifndef YYMAXDEPTH
#define YYMAXDEPTH 150
#endif
YYSTYPE yylval, yyval;
# define YYERRCODE 256

# line 464 "lire.y"


#include "lex.yy.c"

yyerror (s)
char *s;
{
	yyerrok;
	yyclearin;
	printf ("%s a la ligne %d\n",s,yylineno);
	exit(0);
}

int yyexca[] ={
-1, 1,
	0, -1,
	-2, 0,
-1, 10,
	272, 72,
	-2, 0,
-1, 15,
	272, 72,
	-2, 0,
	};
# define YYNPROD 113
# define YYLAST 424
int yyact[]={

    76,   100,     5,   122,     5,    39,   171,    22,    39,    99,
    26,    27,    28,    29,    30,   162,    24,   106,     5,    13,
    14,    25,    10,    32,     8,   179,   183,   119,   120,   121,
   153,   119,   120,   121,   113,   114,   115,   116,   117,   118,
   107,   108,   109,   111,   110,   112,   121,    70,    74,    35,
   119,   120,   121,   113,   114,   115,   116,    44,   190,   107,
   108,   109,   111,   110,   112,   119,   120,   121,   181,   119,
   120,   121,   192,   163,   107,   108,   109,   111,   110,   112,
   109,   111,   110,   112,    22,    72,    67,    26,    27,    28,
    29,    30,    47,    24,    59,    40,    54,   185,    25,    42,
   170,    63,    43,    41,    71,    52,   180,   157,    53,    56,
    33,   167,     3,   130,   129,   134,   104,   164,   172,   133,
   165,    51,   156,    49,   174,   128,    12,    16,     2,   136,
     6,   184,   135,    58,    45,    55,   105,    23,    20,    19,
    18,    17,    15,    36,    11,    61,     9,     7,    81,    21,
   178,   166,    62,   173,   169,    83,     4,     4,    37,    50,
   168,    65,    64,    68,   132,   182,   160,   159,    34,    97,
    38,    95,    96,    46,    94,    60,    86,    85,    82,     1,
     0,    48,    91,     0,   119,   120,   121,   113,   114,   115,
   116,   117,   118,   107,   108,   109,   111,   110,   112,     0,
    57,    93,     0,    69,     0,     4,    34,    66,    73,    57,
     0,     0,    90,    38,     0,     0,     0,    88,    89,    92,
     0,    38,     0,     0,     0,     0,     0,    98,     0,     0,
   131,     5,     0,     5,     0,     0,     0,     0,   101,   102,
   103,    75,    38,   137,    77,     0,     0,     0,   154,    78,
    79,    80,   158,   161,     0,    38,     0,     0,    31,    84,
     5,    39,    87,   119,   120,   121,   113,   114,   115,   116,
   117,   118,   107,   108,   109,   111,   110,   112,    39,   155,
   175,   187,     0,   191,     0,    92,     0,     0,     0,    92,
    92,     0,     0,     0,     0,     0,     0,     0,     0,     0,
     0,     0,   176,     0,     0,     0,     0,     0,     0,     0,
     0,     0,    38,    92,    38,     0,   177,     0,   123,   124,
   125,   126,   127,     0,     0,     0,     0,     0,     0,     0,
     0,   189,     0,     0,     0,     0,    92,     0,     0,     0,
     0,     0,     0,     0,     0,     0,    48,     0,     0,   138,
   139,   140,   141,   142,   143,   144,   145,   146,   147,   148,
   149,   150,   151,   152,     0,     0,     0,     0,     0,     0,
     0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
     0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
     0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
     0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
     0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
     0,   186,     0,   188 };
int yypact[]={

  -282,  -282, -1000,  -269, -1000, -1000, -1000,  -275,  -276, -1000,
  -172,   -36,  -282, -1000, -1000,  -249, -1000, -1000, -1000, -1000,
 -1000,  -293,  -169,  -215,  -293,  -282, -1000, -1000,    83, -1000,
 -1000, -1000,  -276,    77, -1000, -1000, -1000,    50,     1, -1000,
 -1000, -1000, -1000, -1000,  -282, -1000,    -1,    54, -1000,  -282,
  -282,  -282,  -178,  -282,  -293,  -226,    13, -1000,  -181,  -293,
  -223,   -40, -1000,  -296,  -293,    77, -1000, -1000,    50, -1000,
 -1000,   -67,   -23, -1000, -1000,   -90,   -40,   -40,   -40,   -40,
   -40, -1000, -1000, -1000,    90, -1000, -1000, -1000, -1000, -1000,
    67,    66, -1000,  -293, -1000,    75, -1000,    71, -1000, -1000,
 -1000, -1000, -1000, -1000, -1000, -1000,  -293,   -40,   -40,   -40,
   -40,   -40,   -40,   -40,   -40,   -40,   -40,   -40,   -40,   -40,
   -40,   -40, -1000,   -11, -1000, -1000, -1000, -1000, -1000,  -282,
  -293,    81,    49,  -282,   -69,  -194,    76, -1000,  -205,  -205,
  -247,  -247,  -247,  -247,  -209,  -209,  -209,  -209,  -224,  -224,
  -230,  -230, -1000, -1000,    64, -1000, -1000,  -298, -1000, -1000,
 -1000, -1000,    89,   -23, -1000,  -293, -1000,  -293,  -267,    47,
 -1000, -1000,  -201, -1000,  -258, -1000, -1000, -1000,     4,   -40,
  -298,   -40,  -293, -1000,  -211, -1000,  -243, -1000,  -243, -1000,
  -282,  -196, -1000 };
int yypgo[]={

     0,   179,   148,   178,   155,   241,   177,   176,    92,   175,
   172,   109,   105,   171,   169,   167,   166,   165,   164,   118,
   136,   160,   154,   100,   153,   112,   152,   151,   150,   149,
   128,   147,   146,   144,   142,   126,   110,   127,   141,   140,
   139,   138,   137,   135,   134,   133,   116,   132,   131,   129 };
int yyr1[]={

     0,     2,     3,     4,    19,     6,     7,     5,     5,     5,
     5,     5,     5,     5,     5,     5,     5,     5,     5,     5,
     5,     5,     5,     5,     5,     5,     5,     5,     5,     5,
     5,     5,     5,     5,    21,    22,    22,    23,    23,    23,
    24,     1,     1,    25,    30,    31,    32,    33,    33,    33,
    35,    35,    36,    36,    34,    34,    37,    37,    37,    37,
    38,    38,    29,    29,    29,    29,    29,    20,    20,    12,
    12,    11,    42,    39,    39,    43,    10,    13,    13,    14,
    14,    14,    14,    14,    15,    15,    16,    17,    17,    18,
    18,    28,    28,    45,    47,    48,    40,    40,    44,    44,
    46,    46,    49,    49,     8,    41,    41,     9,     9,    26,
    26,    26,    27 };
int yyr2[]={

     0,     3,     3,     3,     3,     3,     3,     7,     7,     7,
     7,     7,     7,     7,     7,     7,     7,     7,     7,     7,
     7,     7,     7,     5,     5,     5,     5,     3,     3,     3,
     3,     5,     3,     3,     3,     3,     7,     3,     3,     3,
     7,     4,     2,     3,     6,     6,     6,     0,     8,     4,
     3,     3,     7,     3,     4,     2,     2,     2,     2,     2,
     9,     5,     3,     3,    13,     3,     3,     3,     7,     1,
     7,     3,     1,     9,     5,    17,     3,     3,     7,     3,
     3,     3,     3,     3,     3,     3,     9,     1,     3,     1,
     5,     1,     5,     1,     1,     1,    25,     5,     3,     6,
     2,     6,     6,     2,     3,     9,     5,     7,     3,    11,
     9,     9,     5 };
int yychk[]={

 -1000,    -1,   -30,   -25,    -4,   300,   -30,   -31,   293,   -32,
   297,   -33,   -35,   295,   296,   -34,   -37,   -38,   -39,   -40,
   -41,   -29,   256,   -42,   265,   270,   259,   260,   261,   262,
   263,   294,    59,   -36,    -4,   298,   -37,   -20,    -2,   301,
   264,   272,   268,   271,   272,   -44,    -2,    -8,    -4,    40,
   -35,    44,   -12,    58,    95,   -43,   -11,    -4,   -45,    95,
    -9,    91,   -26,    47,   -25,   -36,    -4,   264,   -11,    -2,
   273,    91,   266,    -2,   271,    -5,    40,   284,   289,   290,
   291,    -2,    -3,    -4,   299,    -6,    -7,   302,   257,   258,
    -2,   -19,    -4,   -20,   -12,   -13,   -10,   -14,    -4,    76,
    68,   305,   306,   307,   -46,   -20,    40,   283,   284,   285,
   287,   286,   288,   277,   278,   279,   280,   281,   282,   274,
   275,   276,    93,    -5,    -5,    -5,    -5,    -5,    35,    47,
    47,   -20,   -18,    44,    44,   -47,   -49,   -20,    -5,    -5,
    -5,    -5,    -5,    -5,    -5,    -5,    -5,    -5,    -5,    -5,
    -5,    -5,    -5,    41,   -19,    -2,    41,    58,   -19,   -15,
   -16,   -19,    84,   267,    41,    44,   -27,    47,   -21,   -22,
   -23,   304,   -19,   -24,    35,   -46,   -20,    -2,   -28,   292,
    59,   269,   -17,   284,   -48,    93,    -5,   -23,    -5,    -2,
   269,    -8,   268 };
int yydef[]={

     0,    -2,    42,     0,    43,     3,    41,     0,    47,    44,
    -2,     0,     0,    50,    51,    -2,    55,    56,    57,    58,
    59,     0,     0,     0,     0,     0,    62,    63,     0,    65,
    66,    45,     0,    49,    53,    46,    54,    69,    67,     1,
    61,    74,    97,   106,     0,    93,    98,     0,   104,     0,
     0,     0,     0,     0,     0,     0,     0,    71,     0,     0,
     0,     0,   108,     0,     0,    48,    52,    60,    69,    68,
    73,     0,     0,    99,   105,     0,     0,     0,     0,     0,
     0,    27,    28,    29,    30,    32,    33,     2,     5,     6,
     0,     0,     4,     0,    70,    89,    77,     0,    76,    79,
    80,    81,    82,    83,    94,   100,     0,     0,     0,     0,
     0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
     0,     0,   107,     0,    23,    24,    25,    26,    31,     0,
     0,     0,     0,     0,     0,     0,     0,   103,     8,     9,
    10,    11,    12,    13,    14,    15,    16,    17,    18,    19,
    20,    21,    22,     7,   110,   111,    64,     0,    90,    78,
    84,    85,     0,     0,   101,     0,   109,     0,    91,    34,
    35,    37,    38,    39,    87,    95,   102,   112,     0,     0,
     0,     0,     0,    88,     0,    75,    92,    36,    40,    86,
     0,     0,    96 };
typedef struct { char *t_name; int t_val; } yytoktype;
#ifndef YYDEBUG
#	define YYDEBUG	0	/* don't allow debugging */
#endif

#if YYDEBUG

yytoktype yytoks[] =
{
	"TRUE",	257,
	"FALSE",	258,
	"IS",	259,
	"NS",	260,
	"MS",	261,
	"BMS",	262,
	"EMS",	263,
	"ES",	264,
	"TR",	265,
	"FR",	266,
	"TO",	267,
	"ET",	268,
	"AFFECT",	269,
	"RE",	270,
	"ER",	271,
	"AC",	272,
	"EA",	273,
	"OR",	274,
	"XOR",	275,
	"AND",	276,
	"INF_S",	277,
	"SUP_S",	278,
	"INF_E",	279,
	"SUP_E",	280,
	"EQUAL",	281,
	"NO_EQ",	282,
	"ADD",	283,
	"SUB",	284,
	"MUL",	285,
	"EXP",	286,
	"DIV",	287,
	"MOD",	288,
	"NOT",	289,
	"FM",	290,
	"FD",	291,
	"IF",	292,
	"TYPE",	293,
	"ENDT",	294,
	"INT",	295,
	"BOOL",	296,
	"BODY",	297,
	"ENDB",	298,
	"RELET",	299,
	"IDENTIFIER",	300,
	"INTEGER",	301,
	"REAL",	302,
	"UMINUS",	303,
	"-unknown-",	-1	/* ends search */
};

char * yyreds[] =
{
	"-no such reduction-",
	"integer : INTEGER",
	"real : REAL",
	"identifier : IDENTIFIER",
	"variable_name : identifier",
	"vrai : TRUE",
	"faux : FALSE",
	"expression : '(' expression ')'",
	"expression : expression ADD expression",
	"expression : expression SUB expression",
	"expression : expression MUL expression",
	"expression : expression DIV expression",
	"expression : expression EXP expression",
	"expression : expression MOD expression",
	"expression : expression INF_S expression",
	"expression : expression SUP_S expression",
	"expression : expression INF_E expression",
	"expression : expression SUP_E expression",
	"expression : expression EQUAL expression",
	"expression : expression NO_EQ expression",
	"expression : expression OR expression",
	"expression : expression XOR expression",
	"expression : expression AND expression",
	"expression : SUB expression",
	"expression : NOT expression",
	"expression : FM expression",
	"expression : FD expression",
	"expression : integer",
	"expression : real",
	"expression : identifier",
	"expression : RELET",
	"expression : RELET '#'",
	"expression : vrai",
	"expression : faux",
	"structured_text : statement_list",
	"statement_list : statement",
	"statement_list : statement_list ';' statement",
	"statement : 'NIL'",
	"statement : variable_name",
	"statement : assignment",
	"assignment : variable_name AFFECT expression",
	"grafcets : grafcets grafcet",
	"grafcets : grafcet",
	"grafcet_name : identifier",
	"grafcet : grafcet_name zoneDeclType zoneDeclBody",
	"zoneDeclType : TYPE declType ENDT",
	"zoneDeclBody : BODY grafcet_elements ENDB",
	"declType : /* empty */",
	"declType : declType ';' type listeVar",
	"declType : type listeVar",
	"type : INT",
	"type : BOOL",
	"listeVar : listeVar ',' identifier",
	"listeVar : identifier",
	"grafcet_elements : grafcet_elements rest_grafcet_element",
	"grafcet_elements : rest_grafcet_element",
	"rest_grafcet_element : step",
	"rest_grafcet_element : action",
	"rest_grafcet_element : transition",
	"rest_grafcet_element : receptivity",
	"step : step_type step_name step_action ES",
	"step : error ES",
	"step_type : IS",
	"step_type : NS",
	"step_type : MS '(' grafcet_name step_name step_name ')'",
	"step_type : BMS",
	"step_type : EMS",
	"step_name : integer",
	"step_name : integer '_' integer",
	"step_action : /* empty */",
	"step_action : ':' action_name step_action",
	"action_name : identifier",
	"action : /* empty */",
	"action : AC action_association EA",
	"action : error AC",
	"action_association : action_name '[' action_qualifier feedback_name ':' structured_text condition ']'",
	"type_etape : identifier",
	"action_qualifier : type_etape",
	"action_qualifier : time_qualifier ',' action_time",
	"time_qualifier : 'L'",
	"time_qualifier : 'D'",
	"time_qualifier : 'SD'",
	"time_qualifier : 'DS'",
	"time_qualifier : 'SL'",
	"action_time : duration",
	"action_time : variable_name",
	"duration : 'T' '#' sign integer",
	"sign : /* empty */",
	"sign : SUB",
	"feedback_name : /* empty */",
	"feedback_name : ',' variable_name",
	"condition : /* empty */",
	"condition : IF expression",
	"transition : TR transition_name",
	"transition : TR transition_name FR steps",
	"transition : TR transition_name FR steps TO steps",
	"transition : TR transition_name FR steps TO steps AFFECT receptivity_name ET",
	"transition : error ET",
	"transition_name : integer",
	"transition_name : integer '_' integer",
	"steps : step_name",
	"steps : '(' rest_step ')'",
	"rest_step : rest_step ',' step_name",
	"rest_step : step_name",
	"receptivity_name : identifier",
	"receptivity : RE receptivity_name transition_condition ER",
	"receptivity : error ER",
	"transition_condition : '[' expression ']'",
	"transition_condition : timing",
	"timing : '/' integer '/' variable_name end_timing",
	"timing : '/' integer '/' variable_name",
	"timing : '/' variable_name '/' integer",
	"end_timing : '/' integer",
};
#endif /* YYDEBUG */
#line 1 "/usr/lib/yaccpar"
/*	@(#)yaccpar 1.10 89/04/04 SMI; from S5R3 1.10	*/

/*
** Skeleton parser driver for yacc output
*/

/*
** yacc user known macros and defines
*/
#define YYERROR		goto yyerrlab
#define YYACCEPT	{ free(yys); free(yyv); return(0); }
#define YYABORT		{ free(yys); free(yyv); return(1); }
#define YYBACKUP( newtoken, newvalue )\
{\
	if ( yychar >= 0 || ( yyr2[ yytmp ] >> 1 ) != 1 )\
	{\
		yyerror( "syntax error - cannot backup" );\
		goto yyerrlab;\
	}\
	yychar = newtoken;\
	yystate = *yyps;\
	yylval = newvalue;\
	goto yynewstate;\
}
#define YYRECOVERING()	(!!yyerrflag)
#ifndef YYDEBUG
#	define YYDEBUG	1	/* make debugging available */
#endif

/*
** user known globals
*/
int yydebug;			/* set to 1 to get debugging */

/*
** driver internal defines
*/
#define YYFLAG		(-1000)

/*
** static variables used by the parser
*/
static YYSTYPE *yyv;			/* value stack */
static int *yys;			/* state stack */

static YYSTYPE *yypv;			/* top of value stack */
static int *yyps;			/* top of state stack */

static int yystate;			/* current state */
static int yytmp;			/* extra var (lasts between blocks) */

int yynerrs;			/* number of errors */

int yyerrflag;			/* error recovery flag */
int yychar;			/* current input token number */


/*
** yyparse - return 0 if worked, 1 if syntax error not recovered from
*/
int
yyparse()
{
	register YYSTYPE *yypvt;	/* top of value stack for $vars */
	unsigned yymaxdepth = YYMAXDEPTH;

	/*
	** Initialize externals - yyparse may be called more than once
	*/
	yyv = (YYSTYPE*)malloc(yymaxdepth*sizeof(YYSTYPE));
	yys = (int*)malloc(yymaxdepth*sizeof(int));
	if (!yyv || !yys)
	{
		yyerror( "out of memory" );
		return(1);
	}
	yypv = &yyv[-1];
	yyps = &yys[-1];
	yystate = 0;
	yytmp = 0;
	yynerrs = 0;
	yyerrflag = 0;
	yychar = -1;

	goto yystack;
	{
		register YYSTYPE *yy_pv;	/* top of value stack */
		register int *yy_ps;		/* top of state stack */
		register int yy_state;		/* current state */
		register int  yy_n;		/* internal state number info */

		/*
		** get globals into registers.
		** branch to here only if YYBACKUP was called.
		*/
	yynewstate:
		yy_pv = yypv;
		yy_ps = yyps;
		yy_state = yystate;
		goto yy_newstate;

		/*
		** get globals into registers.
		** either we just started, or we just finished a reduction
		*/
	yystack:
		yy_pv = yypv;
		yy_ps = yyps;
		yy_state = yystate;

		/*
		** top of for (;;) loop while no reductions done
		*/
	yy_stack:
		/*
		** put a state and value onto the stacks
		*/
#if YYDEBUG
		/*
		** if debugging, look up token value in list of value vs.
		** name pairs.  0 and negative (-1) are special values.
		** Note: linear search is used since time is not a real
		** consideration while debugging.
		*/
		if ( yydebug )
		{
			register int yy_i;

			(void)printf( "State %d, token ", yy_state );
			if ( yychar == 0 )
				(void)printf( "end-of-file\n" );
			else if ( yychar < 0 )
				(void)printf( "-none-\n" );
			else
			{
				for ( yy_i = 0; yytoks[yy_i].t_val >= 0;
					yy_i++ )
				{
					if ( yytoks[yy_i].t_val == yychar )
						break;
				}
				(void)printf( "%s\n", yytoks[yy_i].t_name );
			}
		}
#endif /* YYDEBUG */
		if ( ++yy_ps >= &yys[ yymaxdepth ] )	/* room on stack? */
		{
			/*
			** reallocate and recover.  Note that pointers
			** have to be reset, or bad things will happen
			*/
			int yyps_index = (yy_ps - yys);
			int yypv_index = (yy_pv - yyv);
			int yypvt_index = (yypvt - yyv);
			yymaxdepth += YYMAXDEPTH;
			yyv = (YYSTYPE*)realloc((char*)yyv,
				yymaxdepth * sizeof(YYSTYPE));
			yys = (int*)realloc((char*)yys,
				yymaxdepth * sizeof(int));
			if (!yyv || !yys)
			{
				yyerror( "yacc stack overflow" );
				return(1);
			}
			yy_ps = yys + yyps_index;
			yy_pv = yyv + yypv_index;
			yypvt = yyv + yypvt_index;
		}
		*yy_ps = yy_state;
		*++yy_pv = yyval;

		/*
		** we have a new state - find out what to do
		*/
	yy_newstate:
		if ( ( yy_n = yypact[ yy_state ] ) <= YYFLAG )
			goto yydefault;		/* simple state */
#if YYDEBUG
		/*
		** if debugging, need to mark whether new token grabbed
		*/
		yytmp = yychar < 0;
#endif
		if ( ( yychar < 0 ) && ( ( yychar = yylex() ) < 0 ) )
			yychar = 0;		/* reached EOF */
#if YYDEBUG
		if ( yydebug && yytmp )
		{
			register int yy_i;

			(void)printf( "Received token " );
			if ( yychar == 0 )
				(void)printf( "end-of-file\n" );
			else if ( yychar < 0 )
				(void)printf( "-none-\n" );
			else
			{
				for ( yy_i = 0; yytoks[yy_i].t_val >= 0;
					yy_i++ )
				{
					if ( yytoks[yy_i].t_val == yychar )
						break;
				}
				(void)printf( "%s\n", yytoks[yy_i].t_name );
			}
		}
#endif /* YYDEBUG */
		if ( ( ( yy_n += yychar ) < 0 ) || ( yy_n >= YYLAST ) )
			goto yydefault;
		if ( yychk[ yy_n = yyact[ yy_n ] ] == yychar )	/*valid shift*/
		{
			yychar = -1;
			yyval = yylval;
			yy_state = yy_n;
			if ( yyerrflag > 0 )
				yyerrflag--;
			goto yy_stack;
		}

	yydefault:
		if ( ( yy_n = yydef[ yy_state ] ) == -2 )
		{
#if YYDEBUG
			yytmp = yychar < 0;
#endif
			if ( ( yychar < 0 ) && ( ( yychar = yylex() ) < 0 ) )
				yychar = 0;		/* reached EOF */
#if YYDEBUG
			if ( yydebug && yytmp )
			{
				register int yy_i;

				(void)printf( "Received token " );
				if ( yychar == 0 )
					(void)printf( "end-of-file\n" );
				else if ( yychar < 0 )
					(void)printf( "-none-\n" );
				else
				{
					for ( yy_i = 0;
						yytoks[yy_i].t_val >= 0;
						yy_i++ )
					{
						if ( yytoks[yy_i].t_val
							== yychar )
						{
							break;
						}
					}
					(void)printf( "%s\n", yytoks[yy_i].t_name );
				}
			}
#endif /* YYDEBUG */
			/*
			** look through exception table
			*/
			{
				register int *yyxi = yyexca;

				while ( ( *yyxi != -1 ) ||
					( yyxi[1] != yy_state ) )
				{
					yyxi += 2;
				}
				while ( ( *(yyxi += 2) >= 0 ) &&
					( *yyxi != yychar ) )
					;
				if ( ( yy_n = yyxi[1] ) < 0 )
					YYACCEPT;
			}
		}

		/*
		** check for syntax error
		*/
		if ( yy_n == 0 )	/* have an error */
		{
			/* no worry about speed here! */
			switch ( yyerrflag )
			{
			case 0:		/* new error */
				yyerror( "syntax error" );
				goto skip_init;
			yyerrlab:
				/*
				** get globals into registers.
				** we have a user generated syntax type error
				*/
				yy_pv = yypv;
				yy_ps = yyps;
				yy_state = yystate;
				yynerrs++;
			skip_init:
			case 1:
			case 2:		/* incompletely recovered error */
					/* try again... */
				yyerrflag = 3;
				/*
				** find state where "error" is a legal
				** shift action
				*/
				while ( yy_ps >= yys )
				{
					yy_n = yypact[ *yy_ps ] + YYERRCODE;
					if ( yy_n >= 0 && yy_n < YYLAST &&
						yychk[yyact[yy_n]] == YYERRCODE)					{
						/*
						** simulate shift of "error"
						*/
						yy_state = yyact[ yy_n ];
						goto yy_stack;
					}
					/*
					** current state has no shift on
					** "error", pop stack
					*/
#if YYDEBUG
#	define _POP_ "Error recovery pops state %d, uncovers state %d\n"
					if ( yydebug )
						(void)printf( _POP_, *yy_ps,
							yy_ps[-1] );
#	undef _POP_
#endif
					yy_ps--;
					yy_pv--;
				}
				/*
				** there is no state on stack with "error" as
				** a valid shift.  give up.
				*/
				YYABORT;
			case 3:		/* no shift yet; eat a token */
#if YYDEBUG
				/*
				** if debugging, look up token in list of
				** pairs.  0 and negative shouldn't occur,
				** but since timing doesn't matter when
				** debugging, it doesn't hurt to leave the
				** tests here.
				*/
				if ( yydebug )
				{
					register int yy_i;

					(void)printf( "Error recovery discards " );
					if ( yychar == 0 )
						(void)printf( "token end-of-file\n" );
					else if ( yychar < 0 )
						(void)printf( "token -none-\n" );
					else
					{
						for ( yy_i = 0;
							yytoks[yy_i].t_val >= 0;
							yy_i++ )
						{
							if ( yytoks[yy_i].t_val
								== yychar )
							{
								break;
							}
						}
						(void)printf( "token %s\n",
							yytoks[yy_i].t_name );
					}
				}
#endif /* YYDEBUG */
				if ( yychar == 0 )	/* reached EOF. quit */
					YYABORT;
				yychar = -1;
				goto yy_newstate;
			}
		}/* end if ( yy_n == 0 ) */
		/*
		** reduction by production yy_n
		** put stack tops, etc. so things right after switch
		*/
#if YYDEBUG
		/*
		** if debugging, print the string that is the user's
		** specification of the reduction which is just about
		** to be done.
		*/
		if ( yydebug )
			(void)printf( "Reduce by (%d) \"%s\"\n",
				yy_n, yyreds[ yy_n ] );
#endif
		yytmp = yy_n;			/* value to switch over */
		yypvt = yy_pv;			/* $vars top of value stack */
		/*
		** Look in goto table for next state
		** Sorry about using yy_state here as temporary
		** register variable, but why not, if it works...
		** If yyr2[ yy_n ] doesn't have the low order bit
		** set, then there is no action to be done for
		** this reduction.  So, no saving & unsaving of
		** registers done.  The only difference between the
		** code just after the if and the body of the if is
		** the goto yy_stack in the body.  This way the test
		** can be made before the choice of what to do is needed.
		*/
		{
			/* length of production doubled with extra bit */
			register int yy_len = yyr2[ yy_n ];

			if ( !( yy_len & 01 ) )
			{
				yy_len >>= 1;
				yyval = ( yy_pv -= yy_len )[1];	/* $$ = $1 */
				yy_state = yypgo[ yy_n = yyr1[ yy_n ] ] +
					*( yy_ps -= yy_len ) + 1;
				if ( yy_state >= YYLAST ||
					yychk[ yy_state =
					yyact[ yy_state ] ] != -yy_n )
				{
					yy_state = yyact[ yypgo[ yy_n ] ];
				}
				goto yy_stack;
			}
			yy_len >>= 1;
			yyval = ( yy_pv -= yy_len )[1];	/* $$ = $1 */
			yy_state = yypgo[ yy_n = yyr1[ yy_n ] ] +
				*( yy_ps -= yy_len ) + 1;
			if ( yy_state >= YYLAST ||
				yychk[ yy_state = yyact[ yy_state ] ] != -yy_n )
			{
				yy_state = yyact[ yypgo[ yy_n ] ];
			}
		}
					/* save until reenter driver code */
		yystate = yy_state;
		yyps = yy_ps;
		yypv = yy_pv;
	}
	/*
	** code supplied by user is placed in this switch
	*/
	switch( yytmp )
	{
		
case 1:
# line 71 "lire.y"
{ yyval.at.type = AR;
		  			  affecte (yyval.at.cont,itoa (yypvt[-0].val),0);
		  			  affecte (yyval.at.ctSf,itoa (yypvt[-0].val),0);
		  			  tabNum [iTabNum++] = yypvt[-0].val; } break;
case 2:
# line 78 "lire.y"
{ yyval.at.type = AR;
		  			  affecte (yyval.at.cont,yypvt[-0].str,0);
		  			  affecte (yyval.at.ctSf,yypvt[-0].str,0); } break;
case 3:
# line 84 "lire.y"
{ yyval.at.type = PI;
		  			  affecte (yyval.at.cont,yypvt[-0].str,0);
		  			  affecte (yyval.at.ctSf,yypvt[-0].str,0); } break;
case 4:
# line 90 "lire.y"
{ affecte (yyval.str,yypvt[-0].at.cont,0);
	  				  affecte (yyval.str,yypvt[-0].at.ctSf,0); } break;
case 5:
# line 95 "lire.y"
{yyval.at.type = LO;
					 affecte (yyval.at.cont,"true",0);
	  				 affecte (yyval.at.ctSf,"true",0); } break;
case 6:
# line 100 "lire.y"
{yyval.at.type = LO;
					 affecte (yyval.at.cont,"false",0);
	  				 affecte (yyval.at.ctSf,"false",0); } break;
case 7:
# line 109 "lire.y"
{ yyval.at = *(ajouteParenthese (yypvt[-1].at)); } break;
case 8:
# line 110 "lire.y"
{ yyval.at = *(ajouteOpArith (yypvt[-2].at,ADD,yypvt[-0].at)); } break;
case 9:
# line 111 "lire.y"
{ yyval.at = *(ajouteOpArith (yypvt[-2].at,SUB,yypvt[-0].at)); } break;
case 10:
# line 112 "lire.y"
{ yyval.at = *(ajouteOpArith (yypvt[-2].at,MUL,yypvt[-0].at)); } break;
case 11:
# line 113 "lire.y"
{ yyval.at = *(ajouteOpArith (yypvt[-2].at,DIV,yypvt[-0].at)); } break;
case 12:
# line 114 "lire.y"
{ yyval.at = *(ajouteOpArith (yypvt[-2].at,EXP,yypvt[-0].at)); } break;
case 13:
# line 115 "lire.y"
{ yyval.at = *(ajouteOpArith (yypvt[-2].at,MOD,yypvt[-0].at)); } break;
case 14:
# line 116 "lire.y"
{ yyval.at = *(ajouteCompArith (yypvt[-2].at,INF_S,yypvt[-0].at)); } break;
case 15:
# line 117 "lire.y"
{ yyval.at = *(ajouteCompArith (yypvt[-2].at,INF_S,yypvt[-0].at)); } break;
case 16:
# line 118 "lire.y"
{ yyval.at = *(ajouteCompArith (yypvt[-2].at,INF_S,yypvt[-0].at)); } break;
case 17:
# line 119 "lire.y"
{ yyval.at = *(ajouteCompArith (yypvt[-2].at,INF_S,yypvt[-0].at)); } break;
case 18:
# line 120 "lire.y"
{ yyval.at = *(ajouteComp (yypvt[-2].at,EQUAL,yypvt[-0].at)); } break;
case 19:
# line 121 "lire.y"
{ yyval.at = *(ajouteComp (yypvt[-2].at,EQUAL,yypvt[-0].at)); } break;
case 20:
# line 122 "lire.y"
{ yyval.at = *(ajouteOpLogiq (yypvt[-2].at,OR,yypvt[-0].at)); } break;
case 21:
# line 123 "lire.y"
{ yyval.at = *(ajouteOpLogiq (yypvt[-2].at,XOR,yypvt[-0].at)); } break;
case 22:
# line 124 "lire.y"
{ yyval.at = *(ajouteOpLogiq (yypvt[-2].at,AND,yypvt[-0].at)); } break;
case 23:
# line 125 "lire.y"
{ yyval.at = *(ajouteMoinsUnaire (yypvt[-0].at)); } break;
case 24:
# line 126 "lire.y"
{ yyval.at = *(ajouteNot (yypvt[-0].at)); } break;
case 25:
# line 127 "lire.y"
{ yyval.at = *(ajouteEdge ("!R",yypvt[-0].at.cont)); } break;
case 26:
# line 128 "lire.y"
{ yyval.at = *(ajouteEdge ("!F",yypvt[-0].at.cont)); } break;
case 27:
# line 129 "lire.y"
{ yyval.at = yypvt[-0].at; 
				/*	  sAffFloat ($$.cont,(double)atoi ($$.cont));
					  strcpy ($$.ctSf,$$.cont);	*/} break;
case 28:
# line 132 "lire.y"
{ yyval.at = yypvt[-0].at; } break;
case 29:
# line 133 "lire.y"
{ Var *var;
					  if (!(var=presentVar(yypvt[-0].at.cont,tabVar)))
					  {	erreur (TYPE_VAR_UNDEF,yypvt[-0].at.cont); 
					  	afficheErreur(FATALE);
					  }
					  else 	if (var->IO ==_ND) 	var->IO =_I;
						else			var->IO=_IO;
					} break;
case 30:
# line 141 "lire.y"
{ yyval.at.type = LO;
					  verifFormat (yypvt[-0].str);
					  affecte (yyval.at.cont,yypvt[-0].str,0); 
					  affecte (yyval.at.ctSf,yypvt[-0].str,0); 
					  ajouterVar (yypvt[-0].str,tabVar,_RELET); } break;
case 31:
# line 147 "lire.y"
{ yyval.at.type = LO;
					  verifFormat (yypvt[-1].str);
					  affecte (yyval.at.cont,yypvt[-1].str,0); 
					  affecte (yyval.at.ctSf,yypvt[-1].str,0); 
					  ajouterVar (yypvt[-1].str,tabVar,_RELIM); } break;
case 32:
# line 153 "lire.y"
{ yyval.at = yypvt[-0].at; } break;
case 33:
# line 154 "lire.y"
{ yyval.at = yypvt[-0].at; } break;
case 34:
# line 163 "lire.y"
{ affecte (yyval.str,yypvt[-0].str,0); } break;
case 35:
# line 167 "lire.y"
{ affecte (yyval.str,yypvt[-0].str,0); } break;
case 36:
# line 168 "lire.y"
{ affecte (yyval.str,yypvt[-2].str,";",yypvt[-0].str,0); } break;
case 37:
# line 172 "lire.y"
{ affecte (yyval.str," NIL ",0); } break;
case 38:
# line 173 "lire.y"
{ affecte (yyval.str,yypvt[-0].str,0);
					  ajouterVar (yypvt[-0].str,tabVar,_ACTION); } break;
case 39:
# line 175 "lire.y"
{ affecte (yyval.str,yypvt[-0].str,0); } break;
case 40:
# line 182 "lire.y"
{ Var *var = 0;
	if (typeAct != 'P') yyerror (ERR_TYPE_ACT_INV);
	affecte (yyval.str,yypvt[-2].str," := ",yypvt[-0].at.cont,0);
	switch (yypvt[-0].at.type) {

		case LO :
			if (var = presentVar (yypvt[-2].str,tabVar)) {
				if (var->type !=_BOOLE && var->type !=_ACTOOL) {
				erreur (TYPE_ARITH_LO,strToUpper (yypvt[-2].str));
				afficheErreur (FATALE);
				}
				else {	var->type =_ACTOOL;
					if (var->IO ==_ND) 	var->IO =_O;
					else 			var->IO=_IO;
				}
			}
			else ajouterVar (yypvt[-2].str,tabVar,_ACTOOL);
			break;

		case AR :
			if (var = presentVar (yypvt[-2].str,tabVar)) {
				if (var->type !=_INTEG && var->type !=_ACTINT) {
				erreur (TYPE_ARITH_LO,strToUpper (yypvt[-2].str));
				afficheErreur (FATALE);
				}
				else {	var->type =_ACTINT;
					if (var->IO ==_ND) 	var->IO =_O;
					else 			var->IO=_IO;
				}
			}
			else ajouterVar (yypvt[-2].str,tabVar,_ACTINT);
			break;
			
	}
} break;
case 43:
# line 228 "lire.y"
{ affecte (yyval.str,yypvt[-0].at.cont,0);
					  ajouterVar (yypvt[-0].at.cont,tabVar,_TITRE); } break;
case 50:
# line 251 "lire.y"
{ typeCourant =_INTEG; } break;
case 51:
# line 252 "lire.y"
{ typeCourant =_BOOLE; } break;
case 52:
# line 256 "lire.y"
{if (!presentVar (yypvt[-0].at.cont,tabVar))
							ajouterVar (yypvt[-0].at.cont,tabVar,typeCourant);
						 else yyerror (ERR_VAR_REDEC);
						} break;
case 53:
# line 261 "lire.y"
{if (!presentVar (yypvt[-0].at.cont,tabVar))
							ajouterVar (yypvt[-0].at.cont,tabVar,typeCourant);
						 else yyerror (ERR_VAR_REDEC);
						} break;
case 60:
# line 283 "lire.y"
{ gr = tabNum [0];
						  et = tabNum [1];
		  				  iTabNum = 0;
		  				  ajouterEt (gr,et,yypvt[-3].val,yypvt[-1].str); 
						  ajouterIdent (yypvt[-1].str,ACTION);
						} break;
case 61:
# line 289 "lire.y"
{ yyerror (ERR_DEC_ETAPE); } break;
case 62:
# line 293 "lire.y"
{ yyval.val = _IS; } break;
case 63:
# line 294 "lire.y"
{ yyval.val = _NS; } break;
case 64:
# line 296 "lire.y"
{ yyval.val = _MS; } break;
case 65:
# line 297 "lire.y"
{ yyval.val = _BMS; } break;
case 66:
# line 298 "lire.y"
{ yyval.val = _EMS; } break;
case 67:
# line 302 "lire.y"
{ tabNum [iTabNum] = tabNum [iTabNum-1];
					  tabNum [iTabNum-1] = 0;
					  iTabNum++;
					  affecte (yyval.str,yypvt[-0].at.cont,0); } break;
case 68:
# line 306 "lire.y"
{ affecte (yyval.str,yypvt[-0].at.cont,0); } break;
case 69:
# line 310 "lire.y"
{ affecte (yyval.str,"",0); } break;
case 70:
# line 311 "lire.y"
{ affecte (yyval.str,yypvt[-1].str," ",yypvt[-0].str,0); } break;
case 71:
# line 315 "lire.y"
{ verifFormat (yypvt[-0].at.cont);
					  strcpy (yyval.str,yypvt[-0].at.cont); } break;
case 72:
# line 323 "lire.y"
{lectAct =1; } break;
case 73:
# line 325 "lire.y"
{
		  iTabNum = 0;
		  lectAct = 0;
		} break;
case 74:
# line 330 "lire.y"
{
		  yyerror (ERR_DEC_ACTION);
		} break;
case 75:
# line 338 "lire.y"
{ 	attr act;
					affecte (act.cont,"[",yypvt[-5].str,yypvt[-4].str,": ",yypvt[-2].str,"]",0);
					strcpy (act.ctSf,act.cont);
					act.type = PI;
					/*ajouterAct ($3,$6,$7);*/
					declareIdent (yypvt[-7].str,tabIdent,ACTION,&act); } break;
case 76:
# line 347 "lire.y"
{	controlTypeEtape (yypvt[-0].at.cont);
				affecte (yyval.str,yypvt[-0].at.cont,0);
				typeAct = yyval.str[0]; } break;
case 77:
# line 353 "lire.y"
{affecte (yyval.str,yypvt[-0].str,0); } break;
case 78:
# line 354 "lire.y"
{ affecte (yyval.str,yypvt[-2].str,",",yypvt[-0].str,0); } break;
case 79:
# line 358 "lire.y"
{ affecte (yyval.str,"N ",0); } break;
case 80:
# line 359 "lire.y"
{ affecte (yyval.str,"D ",0); } break;
case 81:
# line 360 "lire.y"
{ affecte (yyval.str,"SD ",0); } break;
case 82:
# line 361 "lire.y"
{ affecte (yyval.str,"DS ",0); } break;
case 83:
# line 362 "lire.y"
{ affecte (yyval.str,"SL ",0); } break;
case 84:
# line 366 "lire.y"
{ affecte (yyval.str,yypvt[-0].str,0); } break;
case 85:
# line 367 "lire.y"
{ affecte (yyval.str,yypvt[-0].str,0); } break;
case 86:
# line 371 "lire.y"
{ affecte (yyval.str,"T# ",yypvt[-1].str,yypvt[-0].at.cont,0); } break;
case 87:
# line 375 "lire.y"
{ affecte (yyval.str,"",0); } break;
case 88:
# line 376 "lire.y"
{ affecte (yyval.str,"-",0); } break;
case 89:
# line 380 "lire.y"
{ affecte (yyval.str,"",0); } break;
case 90:
# line 381 "lire.y"
{ affecte (yyval.str,",",yypvt[-0].str," ",0); } break;
case 91:
# line 385 "lire.y"
{affecte (yyval.str,"",0); } break;
case 92:
# line 386 "lire.y"
{ if (typeAct != 'C')
						yyerror (ERR_TYPE_ACT_INV);
					  if (yypvt[-0].at.type != LO && yypvt[-0].at.type != PI)
						yyerror (ERR_COND_NOT_LO);
					  affecte (yyval.str,yypvt[-0].at.cont,0); } break;
case 93:
# line 395 "lire.y"
{ gr = tabNum [0];			/** modif **/
					  tr = tabNum [1];
		  			  iTabNum = 0;
		  			  ajouterTr (gr,tr,0); } break;
case 94:
# line 399 "lire.y"
{ mettreEtAv (gr,tr,iTabNum,tabNum);	/** modif **/
		  			  ajouterTrAp (tabNum,iTabNum,gr,tr);	/** modif **/
		  			  iTabNum = 0; } break;
case 95:
# line 402 "lire.y"
{ mettreEtAp (gr,tr,iTabNum,tabNum);	/* modif **/
		  			  ajouterTrAv (tabNum,iTabNum,gr,tr);	/** modif **/
		  			  iTabNum = 0; } break;
case 96:
# line 405 "lire.y"
{ receptTransition (gr,tr,yypvt[-1].at.cont);	/** modif **/
					  ajouterIdent (yypvt[-1].at.cont,RECEPT); } break;
case 97:
# line 407 "lire.y"
{ iTabNum = 0;
					  yyerror (ERR_DEC_TRANS); } break;
case 98:
# line 412 "lire.y"
{ tabNum [iTabNum] = tabNum [iTabNum-1];
					  tabNum [iTabNum -1] = 0;
					  iTabNum++; } break;
case 104:
# line 429 "lire.y"
{ yyval.at = yypvt[-0].at; 
					  verifFormat (yyval.at.cont); } break;
case 105:
# line 439 "lire.y"
{ iTabNum = 0;
		  			  declareIdent (yypvt[-2].at.cont,tabIdent,RECEPT,yypvt[-1].at); } break;
case 106:
# line 441 "lire.y"
{ iTabNum = 0;
					  yyerror  (ERR_DEC_RECEPT); } break;
case 107:
# line 446 "lire.y"
{ if (yypvt[-1].at.type != LO && yypvt[-1].at.type != PI) 
						yyerror (ERR_EXPR_NOT_LO);
					  yyval.at = yypvt[-1].at; } break;
case 108:
# line 450 "lire.y"
{ affecte (yyval.at,yypvt[-0].str,0); } break;
case 109:
# line 455 "lire.y"
{ affecte (yyval.str,"/",yypvt[-3].at.cont,"/",yypvt[-1].str,yypvt[-0].str,0); } break;
case 110:
# line 456 "lire.y"
{ affecte (yyval.str,"/",yypvt[-2].at.cont,"/",yypvt[-0].str,0); } break;
case 111:
# line 457 "lire.y"
{ affecte (yyval.str,"/",yypvt[-2].str,"/",yypvt[-0].at.cont,0); } break;
case 112:
# line 461 "lire.y"
{ affecte (yyval.str,"/",yypvt[-0].at.cont,0); } break;
	}
	goto yystack;		/* reset registers in driver code */
}

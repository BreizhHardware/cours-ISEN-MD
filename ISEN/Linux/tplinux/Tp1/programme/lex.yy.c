# include "stdio.h"
# define U(x) x
# define NLSTATE yyprevious=YYNEWLINE
# define BEGIN yybgin = yysvec + 1 +
# define INITIAL 0
# define YYLERR yysvec
# define YYSTATE (yyestate-yysvec-1)
# define YYOPTIM 1
# define YYLMAX BUFSIZ
# define output(c) putc(c,yyout)
# define input() (((yytchar=yysptr>yysbuf?U(*--yysptr):getc(yyin))==10?(yylineno++,yytchar):yytchar)==EOF?0:yytchar)
# define unput(c) {yytchar= (c);if(yytchar=='\n')yylineno--;*yysptr++=yytchar;}
# define yymore() (yymorfg=1)
# define ECHO fprintf(yyout, "%s",yytext)
# define REJECT { nstr = yyreject(); goto yyfussy;}
int yyleng; extern char yytext[];
int yymorfg;
extern char *yysptr, yysbuf[];
int yytchar;
FILE *yyin = {stdin}, *yyout = {stdout};
extern int yylineno;
struct yysvf { 
	struct yywork *yystoff;
	struct yysvf *yyother;
	int *yystops;};
struct yysvf *yyestate;
extern struct yysvf yysvec[], *yybgin;
#include "y.tab.h"
# define YYNEWLINE 10
yylex(){
int nstr; extern int yyprevious;
while((nstr = yylook()) >= 0)
yyfussy: switch(nstr){
case 0:
if(yywrap()) return(0); break;
case 1:
	{;}
break;
case 2:
	{;}
break;
case 3:
	{return TYPE;}
break;
case 4:
{return ENDT;}
break;
case 5:
	{return BODY;}
break;
case 6:
{return ENDB;}
break;
case 7:
	{return INT ;}
break;
case 8:
	{return BOOL;}
break;
case 9:
	{return TRUE;}
break;
case 10:
	{return FALSE;}
break;
case 11:
	{return XOR;}
break;
case 12:
	{return OR;}
break;
case 13:
	{return AND;}
break;
case 14:
	{return NOT;}
break;
case 15:
	{return FM; }
break;
case 16:
	{return FD; }
break;
case 17:
	{return IS;}
break;
case 18:
	{return NS;}
break;
case 19:
	{return MS;}
break;
case 20:
	{return BMS;}
break;
case 21:
	{return EMS;}
break;
case 22:
	{return ES;}
break;
case 23:
	{return TR;}
break;
case 24:
	{return FR;}
break;
case 25:
	{return TO;}
break;
case 26:
	{return ET;}
break;
case 27:
	{return RE;}
break;
case 28:
	{return ER;}
break;
case 29:
	{return AC;}
break;
case 30:
	{return EA;}
break;
case 31:
	{return INF_E;}
break;
case 32:
	{return SUP_E;}
break;
case 33:
	{return NO_EQ;}
break;
case 34:
	{return INF_S;}
break;
case 35:
	{return SUP_S;}
break;
case 36:
	{return EQUAL;}
break;
case 37:
	{return AFFECT;}
break;
case 38:
	{return ADD;}
break;
case 39:
	{return SUB;}
break;
case 40:
	{return DIV;}
break;
case 41:
	{return EXP;}
break;
case 42:
	{return MUL;}
break;
case 43:
	{return MOD;}
break;
case 44:
	{strcpy (yylval.str,yytext);return RELET; }
break;
case 45:
	{strcpy (yylval.str,yytext);return IDENTIFIER;}
break;
case 46:
{sscanf (yytext,"%d",&yylval.val);return INTEGER;}
break;
case 47:
	{strcpy (yylval.str,yytext);return REAL;}
break;
case 48:
	{return yytext [0];}
break;
case -1:
break;
default:
fprintf(yyout,"bad switch yylook %d",nstr);
} return(0); }
/* end of yylex */

yywrap ()

{
	return 1;
}

int yyvstop[] = {
0,

48,
0,

2,
48,
0,

1,
0,

48,
0,

42,
48,
0,

38,
48,
0,

39,
48,
0,

48,
0,

40,
48,
0,

46,
48,
0,

48,
0,

34,
48,
0,

36,
48,
0,

35,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

45,
48,
0,

2,
0,

16,
0,

15,
0,

41,
0,

47,
0,

46,
0,

37,
0,

31,
0,

33,
0,

32,
0,

45,
0,

45,
0,

29,
45,
0,

45,
0,

45,
0,

30,
45,
0,

45,
0,

28,
45,
0,

22,
45,
0,

26,
45,
0,

45,
0,

24,
45,
0,

17,
45,
0,

45,
0,

19,
45,
0,

18,
45,
0,

27,
45,
0,

25,
45,
0,

23,
45,
0,

45,
0,

44,
45,
0,

45,
0,

45,
0,

45,
0,

45,
0,

45,
0,

12,
45,
0,

45,
0,

45,
0,

20,
45,
0,

45,
0,

21,
45,
0,

45,
0,

43,
45,
0,

45,
0,

13,
45,
0,

45,
0,

45,
0,

7,
45,
0,

14,
45,
0,

45,
0,

11,
45,
0,

45,
0,

5,
45,
0,

45,
0,

45,
0,

3,
45,
0,

44,
45,
0,

8,
45,
0,

45,
0,

9,
45,
0,

45,
0,

45,
0,

45,
0,

44,
45,
0,

10,
45,
0,

45,
0,

45,
0,

6,
45,
0,

4,
45,
0,
0};
# define YYTYPE char
struct yywork { YYTYPE verify, advance; } yycrank[] = {
0,0,	0,0,	1,3,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	1,4,	1,5,	
4,36,	0,0,	0,0,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	1,6,	4,36,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	0,0,	1,7,	
1,8,	7,39,	1,9,	1,10,	
1,11,	1,12,	0,0,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	0,0,	1,13,	
0,0,	1,14,	1,15,	1,16,	
13,43,	16,46,	1,17,	1,18,	
1,19,	1,19,	1,20,	1,21,	
1,19,	1,19,	1,22,	1,19,	
1,19,	1,19,	1,23,	1,24,	
1,19,	1,19,	1,19,	1,25,	
1,19,	1,26,	1,19,	1,19,	
1,19,	1,27,	1,19,	1,19,	
14,44,	14,45,	19,48,	25,48,	
48,48,	25,63,	1,28,	1,29,	
1,19,	1,19,	1,19,	1,30,	
1,19,	1,19,	1,31,	1,19,	
1,19,	1,19,	1,19,	1,32,	
1,33,	1,19,	1,19,	1,19,	
1,19,	1,34,	1,19,	1,19,	
1,19,	1,35,	1,19,	1,19,	
2,6,	21,48,	22,48,	6,37,	
24,48,	49,48,	50,48,	23,48,	
52,48,	2,7,	2,8,	18,48,	
2,9,	2,10,	2,11,	6,38,	
21,58,	28,48,	22,59,	23,60,	
24,62,	18,50,	50,77,	23,61,	
54,48,	2,13,	51,48,	2,14,	
2,15,	2,16,	55,48,	30,48,	
56,48,	2,18,	2,19,	2,19,	
2,20,	2,21,	2,19,	2,19,	
2,22,	2,19,	2,19,	2,19,	
2,23,	2,24,	2,19,	2,19,	
2,19,	2,25,	2,19,	2,26,	
2,19,	2,19,	2,19,	18,51,	
2,19,	2,19,	31,48,	51,78,	
28,68,	30,70,	58,48,	59,48,	
2,28,	2,29,	2,19,	2,19,	
2,19,	2,30,	2,19,	2,19,	
2,31,	2,19,	2,19,	2,19,	
2,19,	2,32,	2,33,	2,19,	
2,19,	2,19,	2,19,	2,34,	
2,19,	2,19,	2,19,	2,35,	
2,19,	2,19,	10,40,	10,40,	
10,40,	10,40,	10,40,	10,40,	
10,40,	10,40,	10,40,	10,40,	
12,41,	31,71,	12,42,	12,42,	
12,42,	12,42,	12,42,	12,42,	
12,42,	12,42,	12,42,	12,42,	
17,47,	17,47,	17,47,	17,47,	
17,47,	17,47,	17,47,	17,47,	
17,47,	17,47,	61,48,	57,48,	
60,48,	60,81,	62,48,	47,48,	
63,48,	17,48,	17,48,	17,49,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	47,76,	
57,80,	29,48,	32,48,	64,48,	
65,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	17,48,	
17,48,	17,48,	17,48,	20,52,	
26,48,	20,48,	33,48,	34,48,	
68,48,	70,48,	66,48,	73,48,	
69,48,	77,48,	79,48,	20,53,	
26,64,	29,69,	32,72,	26,65,	
20,54,	20,55,	20,56,	27,67,	
27,67,	27,67,	27,67,	27,67,	
27,67,	27,67,	27,67,	27,67,	
27,67,	53,48,	80,93,	80,48,	
78,48,	81,48,	82,48,	84,48,	
71,48,	68,84,	27,48,	72,48,	
74,48,	87,48,	75,48,	86,48,	
20,57,	53,79,	70,86,	88,48,	
80,94,	33,73,	34,74,	66,82,	
69,85,	90,48,	26,66,	35,67,	
35,67,	35,67,	35,67,	35,67,	
35,67,	35,67,	35,67,	35,67,	
35,67,	92,48,	94,48,	95,48,	
82,95,	97,48,	99,48,	93,48,	
100,76,	103,76,	35,48,	67,67,	
67,67,	67,67,	67,67,	67,67,	
67,67,	67,67,	67,67,	67,67,	
67,67,	71,87,	78,92,	85,48,	
72,88,	75,90,	74,89,	86,98,	
89,48,	98,48,	67,48,	76,91,	
76,91,	76,91,	76,91,	76,91,	
76,91,	76,91,	76,91,	76,91,	
76,91,	83,96,	83,96,	83,96,	
83,96,	83,96,	83,96,	83,96,	
83,96,	83,96,	83,96,	93,101,	
101,48,	102,48,	35,75,	104,48,	
94,102,	105,48,	67,83,	106,48,	
107,48,	108,48,	89,99,	98,104,	
85,97,	91,100,	91,100,	91,100,	
91,100,	91,100,	91,100,	91,100,	
91,100,	91,100,	91,100,	96,103,	
96,103,	96,103,	96,103,	96,103,	
96,103,	96,103,	96,103,	96,103,	
96,103,	101,105,	0,0,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	106,108,	0,0,	0,0,	
0,0,	0,0,	102,106,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	0,0,	0,0,	
0,0,	0,0,	0,0,	105,107,	
0,0};
struct yysvf yysvec[] = {
0,	0,	0,
yycrank+-1,	0,		0,	
yycrank+-91,	yysvec+1,	0,	
yycrank+0,	0,		yyvstop+1,
yycrank+3,	0,		yyvstop+3,
yycrank+0,	0,		yyvstop+6,
yycrank+57,	0,		yyvstop+8,
yycrank+3,	0,		yyvstop+10,
yycrank+0,	0,		yyvstop+13,
yycrank+0,	0,		yyvstop+16,
yycrank+166,	0,		yyvstop+19,
yycrank+0,	0,		yyvstop+21,
yycrank+178,	0,		yyvstop+24,
yycrank+3,	0,		yyvstop+27,
yycrank+31,	0,		yyvstop+29,
yycrank+0,	0,		yyvstop+32,
yycrank+4,	0,		yyvstop+35,
yycrank+188,	0,		yyvstop+38,
yycrank+68,	yysvec+17,	yyvstop+41,
yycrank+27,	yysvec+17,	yyvstop+44,
yycrank+246,	yysvec+17,	yyvstop+47,
yycrank+58,	yysvec+17,	yyvstop+50,
yycrank+59,	yysvec+17,	yyvstop+53,
yycrank+64,	yysvec+17,	yyvstop+56,
yycrank+61,	yysvec+17,	yyvstop+59,
yycrank+28,	yysvec+17,	yyvstop+62,
yycrank+245,	yysvec+17,	yyvstop+65,
yycrank+283,	yysvec+17,	yyvstop+68,
yycrank+74,	yysvec+17,	yyvstop+71,
yycrank+214,	yysvec+17,	yyvstop+74,
yycrank+88,	yysvec+17,	yyvstop+77,
yycrank+115,	yysvec+17,	yyvstop+80,
yycrank+215,	yysvec+17,	yyvstop+83,
yycrank+247,	yysvec+17,	yyvstop+86,
yycrank+248,	yysvec+17,	yyvstop+89,
yycrank+319,	yysvec+17,	yyvstop+92,
yycrank+0,	yysvec+4,	yyvstop+95,
yycrank+0,	0,		yyvstop+97,
yycrank+0,	0,		yyvstop+99,
yycrank+0,	0,		yyvstop+101,
yycrank+0,	yysvec+10,	yyvstop+103,
yycrank+0,	yysvec+10,	0,	
yycrank+0,	yysvec+12,	yyvstop+105,
yycrank+0,	0,		yyvstop+107,
yycrank+0,	0,		yyvstop+109,
yycrank+0,	0,		yyvstop+111,
yycrank+0,	0,		yyvstop+113,
yycrank+184,	yysvec+17,	yyvstop+115,
yycrank+29,	yysvec+17,	yyvstop+117,
yycrank+62,	yysvec+17,	yyvstop+119,
yycrank+63,	yysvec+17,	yyvstop+122,
yycrank+83,	yysvec+17,	yyvstop+124,
yycrank+65,	yysvec+17,	yyvstop+126,
yycrank+274,	yysvec+17,	yyvstop+129,
yycrank+81,	yysvec+17,	yyvstop+131,
yycrank+87,	yysvec+17,	yyvstop+134,
yycrank+89,	yysvec+17,	yyvstop+137,
yycrank+180,	yysvec+17,	yyvstop+140,
yycrank+119,	yysvec+17,	yyvstop+142,
yycrank+120,	yysvec+17,	yyvstop+145,
yycrank+181,	yysvec+17,	yyvstop+148,
yycrank+179,	yysvec+17,	yyvstop+150,
yycrank+183,	yysvec+17,	yyvstop+153,
yycrank+185,	yysvec+17,	yyvstop+156,
yycrank+216,	yysvec+17,	yyvstop+159,
yycrank+217,	yysvec+17,	yyvstop+162,
yycrank+251,	yysvec+17,	yyvstop+165,
yycrank+339,	yysvec+17,	yyvstop+167,
yycrank+249,	yysvec+17,	yyvstop+170,
yycrank+253,	yysvec+17,	yyvstop+172,
yycrank+250,	yysvec+17,	yyvstop+174,
yycrank+281,	yysvec+17,	yyvstop+176,
yycrank+284,	yysvec+17,	yyvstop+178,
yycrank+252,	yysvec+17,	yyvstop+180,
yycrank+285,	yysvec+17,	yyvstop+183,
yycrank+287,	yysvec+17,	yyvstop+185,
yycrank+359,	0,		0,	
yycrank+254,	yysvec+17,	yyvstop+187,
yycrank+277,	yysvec+17,	yyvstop+190,
yycrank+255,	yysvec+17,	yyvstop+192,
yycrank+276,	yysvec+17,	yyvstop+195,
yycrank+278,	yysvec+17,	yyvstop+197,
yycrank+279,	yysvec+17,	yyvstop+200,
yycrank+369,	0,		0,	
yycrank+280,	yysvec+17,	yyvstop+202,
yycrank+332,	yysvec+17,	yyvstop+205,
yycrank+288,	yysvec+17,	yyvstop+207,
yycrank+286,	yysvec+17,	yyvstop+209,
yycrank+292,	yysvec+17,	yyvstop+212,
yycrank+337,	yysvec+17,	yyvstop+215,
yycrank+298,	yysvec+17,	yyvstop+217,
yycrank+393,	0,		yyvstop+220,
yycrank+310,	yysvec+17,	yyvstop+222,
yycrank+316,	yysvec+17,	yyvstop+225,
yycrank+311,	yysvec+17,	yyvstop+227,
yycrank+312,	yysvec+17,	yyvstop+229,
yycrank+403,	0,		yyvstop+232,
yycrank+314,	yysvec+17,	yyvstop+235,
yycrank+338,	yysvec+17,	yyvstop+238,
yycrank+315,	yysvec+17,	yyvstop+240,
yycrank+289,	yysvec+91,	yyvstop+243,
yycrank+361,	yysvec+17,	yyvstop+245,
yycrank+362,	yysvec+17,	yyvstop+247,
yycrank+290,	yysvec+96,	yyvstop+249,
yycrank+364,	yysvec+17,	yyvstop+252,
yycrank+366,	yysvec+17,	yyvstop+255,
yycrank+368,	yysvec+17,	yyvstop+257,
yycrank+369,	yysvec+17,	yyvstop+259,
yycrank+370,	yysvec+17,	yyvstop+262,
0,	0,	0};
struct yywork *yytop = yycrank+487;
struct yysvf *yybgin = yysvec+1;
char yymatch[] = {
00  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,
01  ,011 ,012 ,01  ,01  ,01  ,01  ,01  ,
01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,
01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,
011 ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,
01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,
'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
'0' ,'0' ,01  ,01  ,01  ,01  ,01  ,01  ,
01  ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,
'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,
'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,
'X' ,'A' ,'A' ,01  ,01  ,01  ,01  ,01  ,
01  ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,
'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,
'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,'A' ,
'X' ,'A' ,'A' ,01  ,01  ,01  ,01  ,01  ,
0};
char yyextra[] = {
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0};
#ifndef lint
static	char ncform_sccsid[] = "@(#)ncform 1.6 88/02/08 SMI"; /* from S5R2 1.2 */
#endif

int yylineno =1;
# define YYU(x) x
# define NLSTATE yyprevious=YYNEWLINE
char yytext[YYLMAX];
struct yysvf *yylstate [YYLMAX], **yylsp, **yyolsp;
char yysbuf[YYLMAX];
char *yysptr = yysbuf;
int *yyfnd;
extern struct yysvf *yyestate;
int yyprevious = YYNEWLINE;
yylook(){
	register struct yysvf *yystate, **lsp;
	register struct yywork *yyt;
	struct yysvf *yyz;
	int yych, yyfirst;
	struct yywork *yyr;
# ifdef LEXDEBUG
	int debug;
# endif
	char *yylastch;
	/* start off machines */
# ifdef LEXDEBUG
	debug = 0;
# endif
	yyfirst=1;
	if (!yymorfg)
		yylastch = yytext;
	else {
		yymorfg=0;
		yylastch = yytext+yyleng;
		}
	for(;;){
		lsp = yylstate;
		yyestate = yystate = yybgin;
		if (yyprevious==YYNEWLINE) yystate++;
		for (;;){
# ifdef LEXDEBUG
			if(debug)fprintf(yyout,"state %d\n",yystate-yysvec-1);
# endif
			yyt = yystate->yystoff;
			if(yyt == yycrank && !yyfirst){  /* may not be any transitions */
				yyz = yystate->yyother;
				if(yyz == 0)break;
				if(yyz->yystoff == yycrank)break;
				}
			*yylastch++ = yych = input();
			yyfirst=0;
		tryagain:
# ifdef LEXDEBUG
			if(debug){
				fprintf(yyout,"char ");
				allprint(yych);
				putchar('\n');
				}
# endif
			yyr = yyt;
			if ( (int)yyt > (int)yycrank){
				yyt = yyr + yych;
				if (yyt <= yytop && yyt->verify+yysvec == yystate){
					if(yyt->advance+yysvec == YYLERR)	/* error transitions */
						{unput(*--yylastch);break;}
					*lsp++ = yystate = yyt->advance+yysvec;
					goto contin;
					}
				}
# ifdef YYOPTIM
			else if((int)yyt < (int)yycrank) {		/* r < yycrank */
				yyt = yyr = yycrank+(yycrank-yyt);
# ifdef LEXDEBUG
				if(debug)fprintf(yyout,"compressed state\n");
# endif
				yyt = yyt + yych;
				if(yyt <= yytop && yyt->verify+yysvec == yystate){
					if(yyt->advance+yysvec == YYLERR)	/* error transitions */
						{unput(*--yylastch);break;}
					*lsp++ = yystate = yyt->advance+yysvec;
					goto contin;
					}
				yyt = yyr + YYU(yymatch[yych]);
# ifdef LEXDEBUG
				if(debug){
					fprintf(yyout,"try fall back character ");
					allprint(YYU(yymatch[yych]));
					putchar('\n');
					}
# endif
				if(yyt <= yytop && yyt->verify+yysvec == yystate){
					if(yyt->advance+yysvec == YYLERR)	/* error transition */
						{unput(*--yylastch);break;}
					*lsp++ = yystate = yyt->advance+yysvec;
					goto contin;
					}
				}
			if ((yystate = yystate->yyother) && (yyt= yystate->yystoff) != yycrank){
# ifdef LEXDEBUG
				if(debug)fprintf(yyout,"fall back to state %d\n",yystate-yysvec-1);
# endif
				goto tryagain;
				}
# endif
			else
				{unput(*--yylastch);break;}
		contin:
# ifdef LEXDEBUG
			if(debug){
				fprintf(yyout,"state %d char ",yystate-yysvec-1);
				allprint(yych);
				putchar('\n');
				}
# endif
			;
			}
# ifdef LEXDEBUG
		if(debug){
			fprintf(yyout,"stopped at %d with ",*(lsp-1)-yysvec-1);
			allprint(yych);
			putchar('\n');
			}
# endif
		while (lsp-- > yylstate){
			*yylastch-- = 0;
			if (*lsp != 0 && (yyfnd= (*lsp)->yystops) && *yyfnd > 0){
				yyolsp = lsp;
				if(yyextra[*yyfnd]){		/* must backup */
					while(yyback((*lsp)->yystops,-*yyfnd) != 1 && lsp > yylstate){
						lsp--;
						unput(*yylastch--);
						}
					}
				yyprevious = YYU(*yylastch);
				yylsp = lsp;
				yyleng = yylastch-yytext+1;
				yytext[yyleng] = 0;
# ifdef LEXDEBUG
				if(debug){
					fprintf(yyout,"\nmatch ");
					sprint(yytext);
					fprintf(yyout," action %d\n",*yyfnd);
					}
# endif
				return(*yyfnd++);
				}
			unput(*yylastch);
			}
		if (yytext[0] == 0  /* && feof(yyin) */)
			{
			yysptr=yysbuf;
			return(0);
			}
		yyprevious = yytext[0] = input();
		if (yyprevious>0)
			output(yyprevious);
		yylastch=yytext;
# ifdef LEXDEBUG
		if(debug)putchar('\n');
# endif
		}
	}
yyback(p, m)
	int *p;
{
if (p==0) return(0);
while (*p)
	{
	if (*p++ == m)
		return(1);
	}
return(0);
}
	/* the following are only used in the lex library */
yyinput(){
	return(input());
	}
yyoutput(c)
  int c; {
	output(c);
	}
yyunput(c)
   int c; {
	unput(c);
	}

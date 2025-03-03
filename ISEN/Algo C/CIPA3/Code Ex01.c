#include <stdio.h>
#include <stdlib.h>

int main (int argc, char** argv)
{
	int taille;
	int i;
	int j;
	
	// Lecture de la taille du carre.
	printf ("Donnez la taille du carre ? ");
	scanf ("%d", &taille);
	printf ("\n");
	
	// Dessin de la bande du haut.
	for (i = 0; i < taille; i++)
		printf ("*");
	printf ("\n");
	
	// Dessin des cotés.
	for (i = 1; i < taille - 1; i++)
	{
		printf ("*");
		for (j = 1; j < taille - 1; j++)
			printf (" ");
		printf ("*\n");
	}
	
	// Dessin de la bande du bas.
	for (i = 0; i < taille; i++)
		printf ("*");
	printf ("\n");
	
	return EXIT_SUCCESS;
}

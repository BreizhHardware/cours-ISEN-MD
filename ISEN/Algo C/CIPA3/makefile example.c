all: program

program: main.o util.o
    gcc -o program main.o util.o

main.o: main.c
    gcc -c main.c

util.o: util.c
    gcc -c util.c
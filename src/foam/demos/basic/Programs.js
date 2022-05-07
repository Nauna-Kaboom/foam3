/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// See:
// http://vintage-basic.net/games.html
// https://github.com/GReaperEx/bcg

foam.CLASS({
  package: 'foam.demos.basic',
  name: 'Programs',

  constants: {
    PROGRAMS: [
[ 'Empty', '' ],
[ 'Test', `
10 PRINT "HELLO"
20 PRINT 42
30 PRINT 1+2
40 PRINT TAB(10);"X"
50 PRINT TAB(1+2);"Y"
60 IF 1=1 THEN PRINT "TRUE"
70 IF 1=2 THEN PRINT "FALSE"
80 A=INT(9/2)
90 PRINT INT(9/2)
100 PRINT "DONE"
110 DATA 1,2,3
120 READ A,B,C
130 PRINT A;B;C
140 DIM X(10),Y(20,2),Z$(2,3,4)
150 PRINT "\\\///"
160 X(0)=1
170 X(1)=2
180 PRINT X(0)
190 PRINT X(1)
200 PRINT X(2)
210 X(0)=4:X(1)=5
220 PRINT X(0);X(1)
300 PRINT 2+3
310 PRINT 2*3
310 PRINT 2^3
320 PRINT 1+2^3+4
400 PRINT "X":PRINT "Y"
410 FOR I=1 TO 10: PRINT "X";: NEXT I
420 FOR I=1 TO 5: FOR J=1 TO I: PRINT "X";: NEXT J:PRINT: NEXT I
` ],
[ '3D Plot', `
1 PRINT TAB(32);"3D PLOT"
2 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
3 PRINT:PRINT
5 DEF FNA(Z)=30*EXP(-Z*Z/100)
100 PRINT
110 FOR X=-30 TO 30 STEP 1.5
120 L=0
130 Y1=5*INT(SQR(900-X*X)/5)
140 FOR Y=Y1 TO -Y1 STEP -5
150 Z=INT(25+FNA(SQR(X*X+Y*Y))-.7*Y)
160 IF Z<=L THEN 190
170 L=Z
180 PRINT TAB(Z);"*";
190 NEXT Y
200 PRINT
210 NEXT X
300 END
`],

[ 'Sine Wave', `
10 PRINT TAB(30);"SINE WAVE"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT: PRINT: PRINT: PRINT: PRINT
40 REMARKABLE PROGRAM BY DAVID AHL
50 B=0
100 REM  START LONG LOOP
110 FOR T=0 TO 40 STEP .25
120 A=INT(26+25*SIN(T))
130 PRINT TAB(A);
140 IF B=1 THEN 180
150 PRINT "CREATIVE"
160 B=1
170 GOTO 200
180 PRINT "COMPUTING"
190 B=0
200 NEXT T
999 END
`],

[ 'Love', `
2 PRINT TAB(33);"LOVE"
4 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
6 PRINT: PRINT: PRINT
20 PRINT "A TRIBUTE TO THE GREAT AMERICAN ARTIST, ROBERT INDIANA."
30 PRINT "HIS GREATEST WORK WILL BE REPRODUCED WITH A MESSAGE OF"
40 PRINT "YOUR CHOICE UP TO 60 CHARACTERS.  IF YOU CAN'T THINK OF"
50 PRINT "A MESSAGE, SIMPLE TYPE THE WORD 'LOVE'": PRINT
60 INPUT "YOUR MESSAGE, PLEASE";A$: L=LEN(A$)
70 DIM T$(120): FOR I=1 TO 10: PRINT: NEXT I
100 FOR J=0 TO INT(60/L)
110 FOR I=1 TO L
120 T$(J*L+I)=MID$(A$,I,1)
130 NEXT I: NEXT J
140 C=0
200 A1=1: P=1: C=C+1: IF C=37 THEN 999
205 PRINT
210 READ A: A1=A1+A: IF P=1 THEN 300
240 FOR I=1 TO A: PRINT " ";: NEXT I: P=1: GOTO 400
300 FOR I=A1-A TO A1-1: PRINT T$(I);: NEXT I: P=0
400 IF A1>60 THEN 200
410 GOTO 210
600 DATA 60,1,12,26,9,12,3,8,24,17,8,4,6,23,21,6,4,6,22,12,5,6,5
610 DATA 4,6,21,11,8,6,4,4,6,21,10,10,5,4,4,6,21,9,11,5,4
620 DATA 4,6,21,8,11,6,4,4,6,21,7,11,7,4,4,6,21,6,11,8,4
630 DATA 4,6,19,1,1,5,11,9,4,4,6,19,1,1,5,10,10,4,4,6,18,2,1,6,8,11,4
640 DATA 4,6,17,3,1,7,5,13,4,4,6,15,5,2,23,5,1,29,5,17,8
650 DATA 1,29,9,9,12,1,13,5,40,1,1,13,5,40,1,4,6,13,3,10,6,12,5,1
660 DATA 5,6,11,3,11,6,14,3,1,5,6,11,3,11,6,15,2,1
670 DATA 6,6,9,3,12,6,16,1,1,6,6,9,3,12,6,7,1,10
680 DATA 7,6,7,3,13,6,6,2,10,7,6,7,3,13,14,10,8,6,5,3,14,6,6,2,10
690 DATA 8,6,5,3,14,6,7,1,10,9,6,3,3,15,6,16,1,1
700 DATA 9,6,3,3,15,6,15,2,1,10,6,1,3,16,6,14,3,1,10,10,16,6,12,5,1
710 DATA 11,8,13,27,1,11,8,13,27,1,60
999 FOR I=1 TO 10: PRINT: NEXT I: END
`],

[ 'Kinema', `
10 PRINT TAB(33);"KINEMA"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT: PRINT: PRINT
100 PRINT
105 PRINT
106 Q=0
110 V=5+INT(35*RND(1))
111 PRINT "A BALL IS THROWN UPWARDS AT";V;"METERS PER SECOND."
112 PRINT
115 A=.05*V^2
116 PRINT "HOW HIGH WILL IT GO (IN METERS)";
117 GOSUB 500
120 A=V/5
122 PRINT "HOW LONG UNTIL IT RETURNS (IN SECONDS)";
124 GOSUB 500
130 T=1+INT(2*V*RND(1))/10
132 A=V-10*T
134 PRINT "WHAT WILL ITS VELOCITY BE AFTER";T;"SECONDS";
136 GOSUB 500
140 PRINT
150 PRINT Q;"RIGHT OUT OF 3.";
160 IF Q<2 THEN 100
170 PRINT "  NOT BAD."
180 GOTO 100
500 INPUT G
502 IF ABS((G-A)/A)<.15 THEN 510
504 PRINT "NOT EVEN CLOSE...."
506 GOTO 512
510 PRINT "CLOSE ENOUGH."
511 Q=Q+1
512 PRINT "CORRECT ANSWER IS ";A
520 PRINT
530 RETURN
999 END
`],

[ 'Poetry', `
10 PRINT TAB(30);"POETRY"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT
90 ON I GOTO 100,101,102,103,104
100 PRINT "MIDNIGHT DREARY";:GOTO 210
101 PRINT "FIERY EYES";:GOTO 210
102 PRINT "BIRD OR FIEND";:GOTO 210
103 PRINT "THING OF EVIL";:GOTO 210
104 PRINT "PROPHET";:GOTO 210
110 ON I GOTO 111,112,113,114,115
111 PRINT "BEGUILING ME";:U=2:GOTO 210
112 PRINT "THRILLED ME";:GOTO 210
113 PRINT "STILL SITTING....";:GOTO 212
114 PRINT "NEVER FLITTING";:U=2:GOTO 210
115 PRINT "BURNED";:GOTO 210
120 ON I GOTO 121,122,123,124,125
121 PRINT "AND MY SOUL";:GOTO 210
122 PRINT "DARKNESS THERE";:GOTO 210
123 PRINT "SHALL BE LIFTED";:GOTO 210
124 PRINT "QUOTH THE RAVEN";:GOTO 210
125 IF U=0 THEN 210
126 PRINT "SIGN OF PARTING";:GOTO 210
130 ON I GOTO 131,132,133,134,135
131 PRINT "NOTHING MORE";:GOTO 210
132 PRINT "YET AGAIN";:GOTO 210
133 PRINT "SLOWLY CREEPING";:GOTO 210
134 PRINT "...EVERMORE";:GOTO 210
135 PRINT "NEVERMORE";
210 IF U=0 OR RND(1)>.19 THEN 212
211 PRINT ",";:U=2
212 IF RND(1)>.65 THEN 214
213 PRINT " ";:U=U+1:GOTO 215
214 PRINT : U=0
215 I=INT(INT(10*RND(1))/2)+1
220 J=J+1 : K=K+1
230 IF U>0 OR INT(J/2)<>J/2 THEN 240
235 PRINT "     ";
240 ON J GOTO 90,110,120,130,250
250 J=0 : PRINT : IF K>20 THEN 999
260 GOTO 215
270 PRINT : U=0 : K=0 : GOTO 110
999 END
`],
[ 'Diamond', `
1 PRINT TAB(33);"DIAMOND"
2 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
3 PRINT:PRINT:PRINT
4 PRINT "FOR A PRETTY DIAMOND PATTERN,"
5 INPUT "TYPE IN AN ODD NUMBER BETWEEN 5 AND 21";R:PRINT
6 Q=INT(60/R):A$="CC"
8 FOR L=1 TO Q
10 X=1:Y=R:Z=2
20 FOR N=X TO Y STEP Z
25 PRINT TAB((R-N)/2);
28 FOR M=1 TO Q
29 C=1
30 FOR A=1 TO N
32 IF C>LEN(A$) THEN PRINT "!";:GOTO 50
34 PRINT MID$(A$,C,1);
36 C=C+1
50 NEXT A
53 IF M=Q THEN 60
55 PRINT TAB(R*M+(R-N)/2);
56 NEXT M
60 PRINT
70 NEXT N
83 IF X<>1 THEN 95
85 X=R-2:Y=1:Z=-2
90 GOTO 20
95 NEXT L
99 END
` ],
[ 'Bunny',
`
10 PRINT TAB(33);"BUNNY"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT: PRINT: PRINT
100 REM  "BUNNY" FROM AHL'S 'BASIC COMPUTER GAMES'
110 DIM B(5)
120 FOR I=0 TO 4:READ B(I):NEXT I
130 GOSUB 260
140 L=64: REM  ASCII LETTER CODE...
150 REM
160 PRINT
170 READ X: IF X<0 THEN 160
175 IF X>128 THEN 240
180 PRINT TAB(X);: READ Y
190 FOR I=X TO Y: J=I-5*INT(I/5)
200 PRINT CHR$(L+B(J));
210 NEXT I
220 GOTO 170
230 REM
240 GOSUB 260: GOTO 450
250 REM
260 FOR I=1 TO 2: PRINT CHR$(10);: NEXT I
270 RETURN
280 REM
290 DATA 2,21,14,14,25
300 DATA 1,2,-1,0,2,45,50,-1,0,5,43,52,-1,0,7,41,52,-1
310 DATA 1,9,37,50,-1,2,11,36,50,-1,3,13,34,49,-1,4,14,32,48,-1
320 DATA 5,15,31,47,-1,6,16,30,45,-1,7,17,29,44,-1,8,19,28,43,-1
330 DATA 9,20,27,41,-1,10,21,26,40,-1,11,22,25,38,-1,12,22,24,36,-1
340 DATA 13,34,-1,14,33,-1,15,31,-1,17,29,-1,18,27,-1
350 DATA 19,26,-1,16,28,-1,13,30,-1,11,31,-1,10,32,-1
360 DATA 8,33,-1,7,34,-1,6,13,16,34,-1,5,12,16,35,-1
370 DATA 4,12,16,35,-1,3,12,15,35,-1,2,35,-1,1,35,-1
380 DATA 2,34,-1,3,34,-1,4,33,-1,6,33,-1,10,32,34,34,-1
390 DATA 14,17,19,25,28,31,35,35,-1,15,19,23,30,36,36,-1
400 DATA 14,18,21,21,24,30,37,37,-1,13,18,23,29,33,38,-1
410 DATA 12,29,31,33,-1,11,13,17,17,19,19,22,22,24,31,-1
420 DATA 10,11,17,18,22,22,24,24,29,29,-1
430 DATA 22,23,26,29,-1,27,29,-1,28,29,-1,4096
440 REM
450 END
` ],
/*
[ '',
`
`],
*/
[ 'Hangman',
`
10 PRINT TAB(32);"HANGMAN"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
25 PRINT:PRINT:PRINT
30 DIM P$(12,12),L$(20),D$(20),N$(26),U(50)
40 C=1: N=50
50 FOR I=1 TO 20: D$(I)="-": NEXT I: M=0
60 FOR I=1 TO 26: N$(I)="": NEXT I
70 FOR I=1 TO 12: FOR J=1 TO 12: P$(I,J)=" ": NEXT J: NEXT I
80 FOR I=1 TO 12: P$(I,1)="X": NEXT I
90 FOR I=1 TO 7: P$(1,I)="X": NEXT: P$(2,7)="X"
95 IF C<N THEN 100
97 PRINT "YOU DID ALL THE WORDS!!": STOP
100 Q=INT(N*RND(1))+1
110 IF U(Q)=1 THEN 100
115 U(Q)=1: C=C+1: RESTORE: T1=0
150 FOR I=1 TO Q: READ A$: NEXT I
160 L=LEN(A$): FOR I=1 TO LEN(A$): L$(I)=MID$(A$,I,1): NEXT I
170 PRINT "HERE ARE THE LETTERS YOU USED:"
180 FOR I=1 TO 26: PRINT N$(I);: IF N$(I+1)="" THEN 200
190 PRINT ",";: NEXT I
200 PRINT: PRINT: FOR I=1 TO L: PRINT D$(I);: NEXT I: PRINT: PRINT
210 INPUT "WHAT IS YOUR GUESS";G$: R=0
220 FOR I=1 TO 26: IF N$(I)="" THEN 250
230 IF G$=N$(I) THEN PRINT "YOU GUESSED THAT LETTER BEFORE!": GOTO 170
240 NEXT I: PRINT "PROGRAM ERROR.  RUN AGAIN.": STOP
250 N$(I)=G$: T1=T1+1
260 FOR I=1 TO L: IF L$(I)=G$ THEN 280
270 NEXT I: IF R=0 THEN 290
275 GOTO 300
280 D$(I)=G$: R=R+1: GOTO 270
290 M=M+1: GOTO 400
300 FOR I=1 TO L: IF D$(I)="-" THEN 320
310 NEXT I: GOTO 390
320 PRINT: FOR I=1 TO L: PRINT D$(I);: NEXT I: PRINT: PRINT
330 INPUT "WHAT IS YOUR GUESS FOR THE WORD";B$
340 IF A$=B$ THEN 360
350 PRINT "WRONG.  TRY ANOTHER LETTER.": PRINT: GOTO 170
360 PRINT "RIGHT!!  IT TOOK YOU";T1;"GUESSES!"
370 INPUT "WANT ANOTHER WORD";W$: IF W$="YES" THEN 50
380 PRINT: PRINT "IT'S BEEN FUN!  BYE FOR NOW.": GOTO 999
390 PRINT "YOU FOUND THE WORD!": GOTO 370
400 PRINT: PRINT: PRINT"SORRY, THAT LETTER ISN'T IN THE WORD."
410 ON M GOTO 415,420,425,430,435,440,445,450,455,460
415 PRINT "FIRST, WE DRAW A HEAD": GOTO 470
420 PRINT "NOW WE DRAW A BODY.": GOTO 470
425 PRINT "NEXT WE DRAW AN ARM.": GOTO 470
430 PRINT "THIS TIME IT'S THE OTHER ARM.": GOTO 470
435 PRINT "NOW, LET'S DRAW THE RIGHT LEG.": GOTO 470
440 PRINT "THIS TIME WE DRAW THE LEFT LEG.": GOTO 470
445 PRINT "NOW WE PUT UP A HAND.": GOTO 470
450 PRINT "NEXT THE OTHER HAND.": GOTO 470
455 PRINT "NOW WE DRAW ONE FOOT": GOTO 470
460 PRINT "HERE'S THE OTHER FOOT -- YOU'RE HUNG!!"
470 ON M GOTO 480,490,500,510,520,530,540,550,560,570
480 P$(3,6)="-": P$(3,7)="-": P$(3,8)="-": P$(4,5)="(": P$(4,6)="."
481 P$(4,8)=".":P$(4,9)=")":P$(5,6)="-":P$(5,7)="-":P$(5,8)="-":GOTO 580
490 FOR I=6 TO 9: P$(I,7)="X": NEXT I: GOTO 580
500 FOR I=4 TO 7: P$(I,I-1)="\": NEXT I: GOTO 580
510 P$(4,11)="/": P$(5,10)="/": P$(6,9)="/": P$(7,8)="/": GOTO 580
520 P$(10,6)="/": P$(11,5)="/": GOTO 580
530 P$(10,8)="\": P$(11,9)="\": GOTO 580
540 P$(3,11)="\": GOTO 580
550 P$(3,3)="/": GOTO 580
560 P$(12,10)="\": P$(12,11)="-": GOTO 580
570 P$(12,3)="-": P$(12,4)="/"
580 FOR I=1 TO 12: FOR J=1 TO 12: PRINT P$(I,J);: NEXT J
590 PRINT: NEXT I: PRINT: PRINT: IF M<>10 THEN 170
600 PRINT "SORRY, YOU LOSE.  THE WORD WAS ";A$
610 PRINT "YOU MISSED THAT ONE.  DO YOU ";: GOTO 370
620 INPUT "TYPE YES OR NO";Y$: IF LEFT$(Y$,1)="Y" THEN 50
700 DATA "GUM","SIN","FOR","CRY","LUG","BYE","FLY"
710 DATA "UGLY","EACH","FROM","WORK","TALK","WITH","SELF"
720 DATA "PIZZA","THING","FEIGN","FIEND","ELBOW","FAULT","DIRTY"
730 DATA "BUDGET","SPIRIT","QUAINT","MAIDEN","ESCORT","PICKAX"
740 DATA "EXAMPLE","TENSION","QUININE","KIDNEY","REPLICA","SLEEPER"
750 DATA "TRIANGLE","KANGAROO","MAHOGANY","SERGEANT","SEQUENCE"
760 DATA "MOUSTACHE","DANGEROUS","SCIENTIST","DIFFERENT","QUIESCENT"
770 DATA "MAGISTRATE","ERRONEOUSLY","LOUDSPEAKER","PHYTOTOXIC"
780 DATA "MATRIMONIAL","PARASYMPATHOMIMETIC","THIGMOTROPISM"
990 PRINT "BYE NOW"
999 END
`],
[ 'Guess',
`
1 PRINT TAB(33);"GUESS"
2 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
3 PRINT:PRINT:PRINT
4 PRINT "THIS IS A NUMBER GUESSING GAME. I'LL THINK"
5 PRINT "OF A NUMBER BETWEEN 1 AND ANY LIMIT YOU WANT."
6 PRINT "THEN YOU HAVE TO GUESS WHAT IT IS."
7 PRINT
9 INPUT "WHAT LIMIT DO YOU WANT? ";L
10 PRINT
11 L1=INT(LOG(L)/LOG(2))+1
12 PRINT "I'M THINKING OF A NUMBER BETWEEN 1 AND ";L
13 G=1
14 PRINT "NOW YOU TRY TO GUESS WHAT IT IS."
15 M=INT(L*RND(1)+1)
20 INPUT "GUESS? ";N
21 IF N>0 THEN 25
22 GOSUB 70
23 GOTO 1
25 IF N=M THEN 50
30 G=G+1
31 IF N>M THEN 40
32 PRINT "TOO LOW. TRY A BIGGER ANSWER."
33 GOTO 20
40 PRINT "TOO HIGH. TRY A SMALLER ANSWER."
42 GOTO 20
50 PRINT "THAT'S IT! YOU GOT IT IN ";G;" TRIES."
52 IF G<L1 THEN 58
54 IF G=L1 THEN 60
56 PRINT "YOU SHOULD HAVE BEEN ABLE TO GET IT IN ONLY ";L1
57 GOTO 65
58 PRINT "VERY ";
60 PRINT "GOOD."
65 GOSUB 70
66 GOTO 12
70 FOR H=1 TO 5
71 PRINT
72 NEXT H
73 RETURN
99 END
`],
[ 'Calendar',
`
10 PRINT TAB(32);"CALENDAR"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT
100 REM     VALUES FOR 1979 - SEE NOTES
110 DIM M(12)
120 FOR I=1 TO 6: PRINT CHR$(10);: NEXT I
130 D=1: REM 1979 STARTS ON MONDAY (0=SUN, -1=MON, -2=TUES...)
140 S=0
150 REM     READ DAYS OF EACH MONTH
160 FOR N=0 TO 12: READ M(N): NEXT N
170 REM
180 FOR N=1 TO 12
190 PRINT: PRINT: S=S+M(N-1)
200 PRINT "**";S;TAB(7);
210 FOR I=1 TO 18: PRINT "*";: NEXT I
220 ON N GOTO 230,240,250,260,270,280,290,300,310,320,330,340
230 PRINT " JANUARY ";: GOTO 350
240 PRINT " FEBRUARY";: GOTO 350
250 PRINT "  MARCH  ";: GOTO 350
260 PRINT "  APRIL  ";: GOTO 350
270 PRINT "   MAY   ";: GOTO 350
280 PRINT "   JUNE  ";: GOTO 350
290 PRINT "   JULY  ";: GOTO 350
300 PRINT "  AUGUST ";: GOTO 350
310 PRINT "SEPTEMBER";: GOTO 350
320 PRINT " OCTOBER ";: GOTO 350
330 PRINT " NOVEMBER";: GOTO 350
340 PRINT " DECEMBER";
350 FOR I=1 TO 18: PRINT "*";: NEXT I
360 PRINT 365-S;"**";
370 REM   366-S;     ON LEAP YEARS
380 PRINT CHR$(10): PRINT "     S       M       T       W";
390 PRINT "       T       F       S"
400 PRINT
410 FOR I=1 TO 59: PRINT "*";: NEXT I
420 REM
430 FOR W=1 TO 6
440 PRINT CHR$(10)
450 PRINT TAB(4)
460 REM
470 FOR G=1 TO 7
480 D=D+1
490 D2=D-S
500 IF D2>M(N) THEN 580
510 IF D2>0 THEN PRINT D2;
520 PRINT TAB(4+8*G);
530 NEXT G
540 REM
550 IF D2=M(N) THEN 590
560 NEXT W
570 REM
580 D=D-G
590 NEXT N
600 REM
610 FOR I=1 TO 6: PRINT CHR$(10);: NEXT I
620 DATA 0,31,28,31,30,31,30,31,31,30,31,30,31
630 REM  0,31,29,  ..., ON LEAP YEARS
640 END
`],
[ 'Benchmark',
`
1 REM From https://www.youtube.com/watch?v=H05hM_Guoqk
2 REM https://docs.google.com/spreadsheets/d/1bfWSR2Ngy1RPedS6j-M607eeAhsd40-nhAfswILzzS8/edit#gid=1310743651
10 FOR i=1 TO 10
20 s=0
30 FOR j=1 TO 1000
40 s=s+j
50 NEXT j
60 PRINT ".";
70 NEXT i
999 END
`]
].map(e => [e[1], e[0]])}});

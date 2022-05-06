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
60 IF 1==1 THEN PRINT "TRUE"
70 IF 1==2 THEN PRINT "FALSE"
80 A=INT(9/2)
90 PRINT INT(9/2)
100 PRINT "DONE"
110 DATA 1,2,3
120 READ A,B,C
130 PRINT A;B;C
140 DIM X(10),Y(20,2),Z$(2,3,4)
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
250 J=0 : PRINT : IF K>20 THEN 270
260 GOTO 215
270 PRINT : U=0 : K=0 : GOTO 110
999 END
`],

[ 'PoetryJS', `
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
125 IF U==0 THEN 210
126 PRINT "SIGN OF PARTING";:GOTO 210
130 ON I GOTO 131,132,133,134,135
131 PRINT "NOTHING MORE";:GOTO 210
132 PRINT "YET AGAIN";:GOTO 210
133 PRINT "SLOWLY CREEPING";:GOTO 210
134 PRINT "...EVERMORE";:GOTO 210
135 PRINT "NEVERMORE";
210 IF U==0 || RND(1)>.19 THEN 212
211 PRINT ",";:U=2
212 IF RND(1)>.65 THEN 214
213 PRINT " ";:U=U+1:GOTO 215
214 PRINT : U=0
215 I=INT(INT(10*RND(1))/2)+1
220 J=J+1 : K=K+1
230 IF U>0 || INT(J/2)!=J/2 THEN 240
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
[ 'DiamondJS', `
1 PRINT TAB(33);"DIAMOND"
2 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
3 PRINT:PRINT:PRINT
4 PRINT "FOR A PRETTY DIAMOND PATTERN,"
5 R=11
6 Q=INT(60/R):A$="CC"
8 FOR L=1 TO Q
10 X=1:Y=R:Z=2
20 FOR N=X TO Y STEP Z
22 T=(R-N)/2
25 PRINT TAB(T);
28 FOR M=1 TO Q
29 C=1
30 FOR A=1 TO N
32 IF C>LEN(A$) THEN PRINT "!";:GOTO 50
34 PRINT "MID$(A$,C,1)";
36 C=C+1
50 NEXT A
53 IF M==Q THEN 60
55 PRINT TAB(R*M+(R-N)/2);
56 NEXT M
60 PRINT
70 NEXT N
83 IF X!=1 THEN 95
85 X=R-2:Y=1:Z=-2
90 GOTO 20
95 NEXT L
99 END
` ],
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

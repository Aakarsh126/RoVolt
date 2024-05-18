#include <SPI.h> //Serial Peripheral Interface library
#include <RF24.h> //rf24 radio module library
#include <nRF24L01.h> //nrf24 radio module library
#include "TimerOne.h" //timer interrupt library
RF24 radio(48, 49); // CE, CSN of nrf24-L01 module
const byte address[10] = "ADIHEX"; //radio adress


  #define encR1a 2
  #define encR2a 18
  #define encR3a 20
  #define encL1a 3
  #define encL2a 19
  #define encL3a 21

  #define encR1b 12
  #define encR2b 23
  #define encR3b 25
  #define encL1b 11
  #define encL2b 22
  #define encL3b 24
  #define logolight 13 //inverse logic
  #define headlight 10 //inverse logic

  #define driveR1a 30
  #define driveR1b 32
  #define driveL1a 33
  #define driveL1b 31
  #define driveR2a 35
  #define driveR2b 37
  #define driveL2a 36
  #define driveL2b 34
  #define driveR3a 28
  #define driveR3b 26
  #define driveL3a 27
  #define driveL3b 29

  #define powerR1 4
  #define powerL1 5
  #define powerR2 9
  #define powerL2 8
  #define powerR3 6
  #define powerL3 7
  #define battery A15
//definition of pins

  int R1pos=0;
  int R2pos=0;
  int R3pos=0;
  int L1pos=0;
  int L2pos=0;
  int L3pos=0;
//position integers

  bool aaR1 = true;
  bool abR1 = true;
  bool baR1 = true;
  bool bbR1 = true;
  bool aaR2 = true;
  bool abR2 = true;
  bool baR2 = true;
  bool bbR2 = true;
  bool aaR3 = true;
  bool abR3 = true;
  bool baR3 = true;
  bool bbR3 = true;
  bool aaL1 = true;
  bool abL1 = true;
  bool baL1 = true;
  bool bbL1 = true;
  bool aaL2 = true;
  bool abL2 = true;
  bool baL2 = true;
  bool bbL2 = true;
  bool aaL3 = true;
  bool abL3 = true;
  bool baL3 = true;
  bool bbL3 = true;
//coordination error prevention booleans

  void changeR1()
  { bool a=digitalRead(encR1a);
    bool b=digitalRead(encR1b);
    if((a==HIGH)&&(b==HIGH)&&(aaR1))
    {
      R1pos--;
      aaR1 = false;
      abR1 = true;
      baR1 = true;
      bbR1 = true;
      }
    else if((a==HIGH)&&(b==LOW)&&(abR1))
    {R1pos++;
      aaR1 = true;
      abR1 = false;
      baR1 = true;
      bbR1 = true;}
    else if((a==LOW)&&(b==LOW)&&(bbR1))
    {R1pos--;
      aaR1 = true;
      abR1 = true;
      baR1 = true;
      bbR1 = false;}
    else if((a==LOW)&&(b==HIGH)&&(baR1))
    {R1pos++;
      aaR1 = true;
      abR1 = true;
      baR1 = false;
      bbR1 = true;}
  }
  void changeR2()
  { bool a=digitalRead(encR2a);
    bool b=digitalRead(encR2b);
    if((a==HIGH)&&(b==HIGH)&&(aaR2))
    {
      R2pos--;
        aaR2 = false;
        abR2 = true;
        baR2 = true;
        bbR2 = true;
      }
    else if((a==HIGH)&&(b==LOW)&&(abR2))
    {R2pos++;
        aaR2 = true;
        abR2 = false;
        baR2 = true;
        bbR2 = true;}
    else if((a==LOW)&&(b==LOW)&&(bbR2))
    {R2pos--;
        aaR2 = true;
        abR2 = true;
        baR2 = true;
        bbR2 = false;}
    else if((a==LOW)&&(b==HIGH)&&(baR2))
    {R2pos++;
        aaR2 = true;
        abR2 = true;
        baR2 = false;
        bbR2 = true;}
  }
  void changeR3()
  { bool a=digitalRead(encR3a);
    bool b=digitalRead(encR3b);
    if((a==HIGH)&&(b==HIGH)&&(aaR3))
    {
      R3pos--;
        aaR3 = false;
        abR3 = true;
        baR3 = true;
        bbR3 = true;
      }
    else if((a==HIGH)&&(b==LOW)&&(abR3))
    {R3pos++;
        aaR3 = true;
        abR3 = false;
        baR3 = true;
        bbR3 = true;}
    else if((a==LOW)&&(b==LOW)&&(bbR3))
    {R3pos--;
        aaR3 = true;
        abR3 = true;
        baR3 = true;
        bbR3 = false;}
    else if((a==LOW)&&(b==HIGH)&&(baR3))
    {R3pos++;
        aaR3 = true;
        abR3 = true;
        baR3 = false;
        bbR3 = true;}
  }
  void changeL1()
  { bool a=digitalRead(encL1a);
    bool b=digitalRead(encL1b);
    if((a==HIGH)&&(b==HIGH)&&(aaL1))
    {
      L1pos--;
        aaL1 = false;
        abL1 = true;
        baL1 = true;
        bbL1 = true;
      }
    else if((a==HIGH)&&(b==LOW)&&(abL1))
    {L1pos++;
        aaL1 = true;
        abL1 = false;
        baL1 = true;
        bbL1 = true;}
    else if((a==LOW)&&(b==LOW)&&(bbL1))
    {L1pos--;
        aaL1 = true;
        abL1 = true;
        baL1 = true;
        bbL1 = false;}
    else if((a==LOW)&&(b==HIGH)&&(baL1))
    {L1pos++;
        aaL1 = true;
        abL1 = true;
        baL1 = false;
        bbL1 = true;}
  }
  void changeL2()
   { bool a=digitalRead(encL2a);
    bool b=digitalRead(encL2b);
    if((a==HIGH)&&(b==HIGH)&&(aaL2))
    {
      L2pos++;
        aaL2 = false;
        abL2 = true;
        baL2 = true;
        bbL2 = true;
      }
    else if((a==HIGH)&&(b==LOW)&&(abL2))
    {L2pos--;
        aaL2 = true;
        abL2 = false;
        baL2 = true;
        bbL2 = true;}
    else if((a==LOW)&&(b==LOW)&&(bbL2))
    {L2pos++;
        aaL2 = true;
        abL2 = true;
        baL2 = true;
        bbL2 = false;}
    else if((a==LOW)&&(b==HIGH)&&(baL2))
    {L2pos--;
        aaL2 = true;
        abL2 = true;
        baL2 = false;
        bbL2 = true;}
  }
  void changeL3()
   { bool a=digitalRead(encL3a);
    bool b=digitalRead(encL3b);
    if((a==HIGH)&&(b==HIGH)&&(aaL3))
    {
      L3pos++;
        aaL3 = false;
        abL3 = true;
        baL3 = true;
        bbL3 = true;
      }
    else if((a==HIGH)&&(b==LOW)&&(abL3))
    {L3pos--;
        aaL3 = true;
        abL3 = false;
        baL3 = true;
        bbL3 = true;}
    else if((a==LOW)&&(b==LOW)&&(bbL3))
    {L3pos++;
        aaL3 = true;
        abL3 = true;
        baL3 = true;
        bbL3 = false;}
    else if((a==LOW)&&(b==HIGH)&&(baL3))
    {L3pos--;
        aaL3 = true;
        abL3 = false;
        baL3 = true;
        bbL3 = true;}
  }
//encoder functions

void setup() {
  // put your setup code here, to run once:
    pinMode(logolight,OUTPUT);
    pinMode(headlight,OUTPUT);  
    delay(30);  
    for(int i=0;i<10;i++)
    {
    digitalWrite(logolight,LOW);
    delay(30);  
    digitalWrite(logolight,HIGH);
    delay(30); } 
    digitalWrite(logolight,LOW);
    delay(800); 
    for(int i=0;i<=245;i++)
    {analogWrite(logolight,i);
     analogWrite(headlight,i);
    delay(4);}
  //startup sequence
  pinMode(driveR1a,OUTPUT);
  pinMode(driveR1b,OUTPUT);
  pinMode(driveR2a,OUTPUT);
  pinMode(driveR2b,OUTPUT);
  pinMode(driveR3a,OUTPUT);
  pinMode(driveR3b,OUTPUT);
  pinMode(driveL1a,OUTPUT);
  pinMode(driveL1b,OUTPUT);
  pinMode(driveL2a,OUTPUT);
  pinMode(driveL2b,OUTPUT);
  pinMode(driveL3a,OUTPUT);
  pinMode(driveL3b,OUTPUT);
  pinMode(powerR1,OUTPUT);
  pinMode(powerR2,OUTPUT);
  pinMode(powerR3,OUTPUT);
  pinMode(powerL1,OUTPUT);
  pinMode(powerL2,OUTPUT);
  pinMode(powerL3,OUTPUT);
  digitalWrite(powerR1,HIGH);
  digitalWrite(powerR2,HIGH);
  digitalWrite(powerR3,HIGH);
  digitalWrite(powerL1,HIGH);
  digitalWrite(powerL2,HIGH);
  digitalWrite(powerL3,HIGH);
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MAX);
  radio.startListening();
  //pinmodes and inital states
  attachInterrupt(digitalPinToInterrupt(encR1a), changeR1, CHANGE);
  attachInterrupt(digitalPinToInterrupt(encR2a), changeR2, CHANGE);
  attachInterrupt(digitalPinToInterrupt(encR3a), changeR3, CHANGE);
  attachInterrupt(digitalPinToInterrupt(encL1a), changeL1, CHANGE);
  attachInterrupt(digitalPinToInterrupt(encL2a), changeL2, CHANGE);
  attachInterrupt(digitalPinToInterrupt(encL3a), changeL3, CHANGE);
  //interrupts
}
//setup

  char txt[5] = "";
  char test='Z';

void loop() {
  // put your main code here, to run repeatedly:
    radio.read(&txt, sizeof(txt));
    if (txt[0]=='F'||txt[0]=='B'||txt[0]=='L'||txt[0]=='R'||txt[0]=='H'||txt[0]=='W'||txt[0]=='S')
    {test=txt[0];}
    switch (test)
   {
    case 'F': //forward  
     break;
    case 'B': //backward  
     break;
    case 'R': //right  
     break;
    case 'L': //left  
     break;
    case 'H': //home  
     break;
    case 'S': //lights-sun  
     break;
    case 'Z': //flip qnd go
     break;
    case 'C': //toggle crawl amd walk  
     break;
   }

    Serial.println(R1pos);
    Serial.println(R2pos);
    Serial.println(R3pos);
    Serial.println(L1pos);
    Serial.println(L2pos);
    Serial.println(analogRead(battery));
    Serial.println("");
  delay(1000);
}

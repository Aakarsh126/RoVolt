// RoVolt

#include <SPI.h>
#include "TimerOne.h"

// Light pins
#define logolight 13 // inverse logic
#define headlight 10 // inverse logic

// Direction pins
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

// Speed pins
#define powerR1 4
#define powerL1 5
#define powerR2 9
#define powerL2 8
#define powerR3 6
#define powerL3 7

// Encoder pins
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

// Position integers
int R1pos = 0;
int R2pos = 0;
int R3pos = 0;
int L1pos = 0;
int L2pos = 0;
int L3pos = 0;

// Coordination error prevention booleans
bool aaR1 = true, abR1 = true, baR1 = true, bbR1 = true;
bool aaR2 = true, abR2 = true, baR2 = true, bbR2 = true;
bool aaR3 = true, abR3 = true, baR3 = true, bbR3 = true;
bool aaL1 = true, abL1 = true, baL1 = true, bbL1 = true;
bool aaL2 = true, abL2 = true, baL2 = true, bbL2 = true;
bool aaL3 = true, abL3 = true, baL3 = true, bbL3 = true;

void setup() {
    // Initialize pins
    pinMode(logolight, OUTPUT);
    pinMode(headlight, OUTPUT);  

    // Light sequence
    digitalWrite(headlight, HIGH);
    digitalWrite(logolight, HIGH);
    delay(300);  
    digitalWrite(logolight, LOW);
    delay(300);  
    digitalWrite(logolight, HIGH);
    delay(300);  
    digitalWrite(logolight, LOW);
    delay(300);  
    digitalWrite(logolight, HIGH);
    delay(300);  
    digitalWrite(logolight, LOW);
    delay(400);  
    for(int i = 0; i <= 255; i++) {
        analogWrite(logolight, i);
        delay(3);
    }  
    digitalWrite(logolight, HIGH);

    // Set motor pin modes
    pinMode(driveR1a, OUTPUT);
    pinMode(driveR1b, OUTPUT);
    pinMode(driveR2a, OUTPUT);
    pinMode(driveR2b, OUTPUT);
    pinMode(driveR3a, OUTPUT);
    pinMode(driveR3b, OUTPUT);
    pinMode(driveL1a, OUTPUT);
    pinMode(driveL1b, OUTPUT);
    pinMode(driveL2a, OUTPUT);
    pinMode(driveL2b, OUTPUT);
    pinMode(driveL3a, OUTPUT);
    pinMode(driveL3b, OUTPUT);
    pinMode(powerR1, OUTPUT);
    pinMode(powerR2, OUTPUT);
    pinMode(powerR3, OUTPUT);
    pinMode(powerL1, OUTPUT);
    pinMode(powerL2, OUTPUT);
    pinMode(powerL3, OUTPUT);
    
    digitalWrite(powerR1, HIGH);
    digitalWrite(powerR2, HIGH);
    digitalWrite(powerR3, HIGH);
    digitalWrite(powerL1, HIGH);
    digitalWrite(powerL2, HIGH);
    digitalWrite(powerL3, HIGH);
    
    Serial.begin(9600);

    // Attach interrupts for encoders
    attachInterrupt(digitalPinToInterrupt(encR1a), changeR1, CHANGE);
    attachInterrupt(digitalPinToInterrupt(encR2a), changeR2, CHANGE);
    attachInterrupt(digitalPinToInterrupt(encR3a), changeR3, CHANGE);
    attachInterrupt(digitalPinToInterrupt(encL1a), changeL1, CHANGE);
    attachInterrupt(digitalPinToInterrupt(encL2a), changeL2, CHANGE);
    attachInterrupt(digitalPinToInterrupt(encL3a), changeL3, CHANGE);

    // Move forward for 5 seconds
    moveForward(5000);
}

void changeR1() {
    bool a = digitalRead(encR1a);
    bool b = digitalRead(encR1b);
    if((a == HIGH) && (b == HIGH) && aaR1) {
        R1pos--;
        aaR1 = false;
        abR1 = true;
        baR1 = true;
        bbR1 = true;
    } else if((a == HIGH) && (b == LOW) && abR1) {
        R1pos++;
        aaR1 = true;
        abR1 = false;
        baR1 = true;
        bbR1 = true;
    } else if((a == LOW) && (b == LOW) && bbR1) {
        R1pos--;
        aaR1 = true;
        abR1 = true;
        baR1 = true;
        bbR1 = false;
    } else if((a == LOW) && (b == HIGH) && baR1) {
        R1pos++;
        aaR1 = true;
        abR1 = true;
        baR1 = false;
        bbR1 = true;
    }
}

void changeR2() {
    bool a = digitalRead(encR2a);
    bool b = digitalRead(encR2b);
    if((a == HIGH) && (b == HIGH) && aaR2) {
        R2pos--;
        aaR2 = false;
        abR2 = true;
        baR2 = true;
        bbR2 = true;
    } else if((a == HIGH) && (b == LOW) && abR2) {
        R2pos++;
        aaR2 = true;
        abR2 = false;
        baR2 = true;
        bbR2 = true;
    } else if((a == LOW) && (b == LOW) && bbR2) {
        R2pos--;
        aaR2 = true;
        abR2 = true;
        baR2 = true;
        bbR2 = false;
    } else if((a == LOW) && (b == HIGH) && baR2) {
        R2pos++;
        aaR2 = true;
        abR2 = true;
        baR2 = false;
        bbR2 = true;
    }
}

void changeR3() {
    bool a = digitalRead(encR3a);
    bool b = digitalRead(encR3b);
    if((a == HIGH) && (b == HIGH) && aaR3) {
        R3pos--;
        aaR3 = false;
        abR3 = true;
        baR3 = true;
        bbR3 = true;
    } else if((a == HIGH) && (b == LOW) && abR3) {
        R3pos++;
        aaR3 = true;
        abR3 = false;
        baR3 = true;
        bbR3 = true;
    } else if((a == LOW) && (b == LOW) && bbR3) {
        R3pos--;
        aaR3 = true;
        abR3 = true;
        baR3 = true;
        bbR3 = false;
    } else if((a == LOW) && (b == HIGH) && baR3) {
        R3pos++;
        aaR3 = true;
        abR3 = true;
        baR3 = false;
        bbR3 = true;
    }
}

void changeL1() {
    bool a = digitalRead(encL1a);
    bool b = digitalRead(encL1b);
    if((a == HIGH) && (b == HIGH) && aaL1) {
        L1pos--;
        aaL1 = false;
        abL1 = true;
        baL1 = true;
        bbL1 = true;
    } else if((a == HIGH) && (b == LOW) && abL1) {
        L1pos++;
        aaL1 = true;
        abL1 = false;
        baL1 = true;
        bbL1 = true;
    } else if((a == LOW) && (b == LOW) && bbL1) {
        L1pos--;
        aaL1 = true;
        abL1 = true;
        baL1 = true;
        bbL1 = false;
    } else if((a == LOW) && (b == HIGH) && baL1) {
        L1pos++;
        aaL1 = true;
        abL1 = true;
        baL1 = false;
        bbL1 = true;
    }
}

void changeL2() {
    bool a = digitalRead(encL2a);
    bool b = digitalRead(encL2b);
    if((a == HIGH) && (b == HIGH) && aaL2) {
        L2pos--;
        aaL2 = false;
        abL2 = true;
        baL2 = true;
        bbL2 = true;
    } else if((a == HIGH) && (b == LOW) && abL2) {
        L2pos++;
        aaL2 = true;
        abL2 = false;
        baL2 = true;
        bbL2 = true;
    } else if((a == LOW) && (b == LOW) && bbL2) {
        L2pos--;
        aaL2 = true;
        abL2 = true;
        baL2 = true;
        bbL2 = false;
    } else if((a == LOW) && (b == HIGH) && baL2) {
        L2pos++;
        aaL2 = true;
        abL2 = true;
        baL2 = false;
        bbL2 = true;
    }
}

void changeL3() {
    bool a = digitalRead(encL3a);
    bool b = digitalRead(encL3b);
    if((a == HIGH) && (b == HIGH) && aaL3) {
        L3pos--;
        aaL3 = false;
        abL3 = true;
        baL3 = true;
        bbL3 = true;
    } else if((a == HIGH) && (b == LOW) && abL3) {
        L3pos++;
        aaL3 = true;
        abL3 = false;
        baL3 = true;
        bbL3 = true;
    } else if((a == LOW) && (b == LOW) && bbL3) {
        L3pos--;
        aaL3 = true;
        abL3 = true;
        baL3 = true;
        bbL3 = false;
    } else if((a == LOW) && (b == HIGH) && baL3) {
        L3pos++;
        aaL3 = true;
        abL3 = true;
        baL3 = false;
        bbL3 = true;
    }
}

void moveMotor(int motor, int direction) {
    int driveA, driveB, powerPin;
    switch(motor) {
        case 1:
            driveA = driveR1a;
            driveB = driveR1b;
            powerPin = powerR1;
            break;
        case 2:
            driveA = driveR2a;
            driveB = driveR2b;
            powerPin = powerR2;
            break;
        case 3:
            driveA = driveR3a;
            driveB = driveR3b;
            powerPin = powerR3;
            break;
        case 4:
            driveA = driveL1a;
            driveB = driveL1b;
            powerPin = powerL1;
            break;
        case 5:
            driveA = driveL2a;
            driveB = driveL2b;
            powerPin = powerL2;
            break;
        case 6:
            driveA = driveL3a;
            driveB = driveL3b;
            powerPin = powerL3;
            break;
        default:
            return;
    }
    digitalWrite(driveA, direction == 1 ? HIGH : LOW);
    digitalWrite(driveB, direction == -1 ? HIGH : LOW);
}

void moveForward(unsigned long duration) {
    // Start all motors in forward direction
    for (int i = 1; i <= 6; i++) {
        moveMotor(i, 1);
    }
    delay(duration);
    // Stop all motors
    for (int i = 1; i <= 6; i++) {
        moveMotor(i, 0);
    }
}

void loop() {
    // Receive command from remote
    char text[32] = "";
    if (radio.available()) {
        radio.read(&text, sizeof(text));
        Serial.println(text);
        // Parse and execute command
        if (strcmp(text, "forward") == 0) {
            moveMotor(1, 1);
            moveMotor(2, 1);
            moveMotor(3, 1);
            moveMotor(4, 1);
            moveMotor(5, 1);
            moveMotor(6, 1);
        } else if (strcmp(text, "backward") == 0) {
            moveMotor(1, -1);
            moveMotor(2, -1);
            moveMotor(3, -1);
            moveMotor(4, -1);
            moveMotor(5, -1);
            moveMotor(6, -1);
        } else if (strcmp(text, "stop") == 0) {
            moveMotor(1, 0);
            moveMotor(2, 0);
            moveMotor(3, 0);
            moveMotor(4, 0);
            moveMotor(5, 0);
            moveMotor(6, 0);
        }
    }
    
    // Update encoder readings
    Serial.print("R1: "); Serial.println(R1pos);
    Serial.print("R2: "); Serial.println(R2pos);
    Serial.print("R3: "); Serial.println(R3pos);
    Serial.print("L1: "); Serial.println(L1pos);
    Serial.print("L2: "); Serial.println(L2pos);
    Serial.print("L3: "); Serial.println(L3pos);
    
    delay(100);
}
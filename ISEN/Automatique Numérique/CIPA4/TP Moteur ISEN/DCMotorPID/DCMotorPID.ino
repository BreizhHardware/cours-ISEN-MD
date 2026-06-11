// DC Motor speed control using only one channel 2X resolution
// velocity estimation using interrupts
// This code displays the number of RPM (rounds per minute) for 
// a unidirectional motor
double count=0,Speed;
const int GR=1200;
double timep,time,etime;
double error, setpoint, derivative,output, previous_error = 0,integral = 0  ;
double kp,ki,kd;


void setup()
{
  Serial.begin(9600);
  //connect channel A to pin 3
  pinMode(2,INPUT);
  pinMode(3,INPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  attachInterrupt(0,transition,CHANGE);//interrupt(0,*,*) for pin 2; interrupt(1,*,*) for pin 3
  attachInterrupt(1,transition,CHANGE);
  //set the initial time
  timep=micros();
  kp=0;
  ki=0;
  kd=0;
  setpoint=70; //consigne
  digitalWrite(6,LOW);
}

void transition()
{
  count++;
}

void loop()
{ 
//run the motor for 10 seconds
  while(micros()<5e6){
  time = micros();
  etime=time - timep;
  if (etime>0.02e6) // each Ts
  { 
    Speed=((count*60)/(GR*etime*1e-6));
    //Serial.println(measured_value); 
    error=setpoint - Speed;
     integral = integral + error*(etime*1e-6);
     derivative = (error - previous_error)/(etime*1e-6);
     output = kp*error + ki*integral + kd*derivative; // motor effort will be between 0 to 100 percent
//     Serial.println(error); 
//     Serial.println(integral);
//     Serial.println(derivative);
     Serial.print(Speed);
     if (abs(output)>1){
      output=1;
     }
     Serial.print("  ");
     Serial.println(output);
     output=output*255; // conversion to bit
     analogWrite(5,output);
     previous_error = error;
    //Speed=(count*60*)/(816.5*etime*1e-6); //Speed in RPM GR=1633/2 cuz X2 resolution
    //Serial.println(Speed); 
    count=0;
    timep = time; //reset timer
  }
}
  if(micros()>5e6){
  analogWrite(5,0);
  }
}

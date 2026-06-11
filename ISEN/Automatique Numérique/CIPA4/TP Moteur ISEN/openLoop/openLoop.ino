// Sample code using interrupts
unsigned long count=0;
unsigned long timep,time,etime;
const int GR=1200;
double Speed;

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
  timep=micros();
  analogWrite(5,0); 
  analogWrite(6,0); 
}

void transition()
{
  count++;
}

void loop()
{
  //in this practical work 3 seconds is enough to find the transcient response of the system

  while(micros()<3e6){
  // Add here the missing line of the code to turn the motor on
  digitalWrite(5, 128);

  time = micros();
  etime=time - timep;
  if (etime>0.015e6) //sampling time is 0.015
  {
    //calculate the speed in RPM ( 1100 counts correspond to 1 revolution)
    Speed=((count*60)/(GR*etime*1e-6));
    Serial.println(Speed);
    timep = time; //reset timer
    count=0; // reset counter
  }

  // if the time is greater than 3 sec, turn the motor off
}

if(micros()>3e6){
  digitalWrite(5,LOW);
  }

}

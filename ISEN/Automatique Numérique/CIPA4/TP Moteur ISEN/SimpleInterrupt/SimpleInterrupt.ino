// Sample code using interrupts
unsigned long count=0;
unsigned long timep,time,etime;

void setup()
{
  Serial.begin(9600);
  //connect channel A to pin 3
  pinMode(2,INPUT);
  pinMode(3,INPUT);
  attachInterrupt(1,transition,CHANGE);//interrupt(0,*,*) for pin 2; interrupt(1,*,*) for pin 3
  attachInterrupt(0,transition,CHANGE);
  //set the initial time
  timep=micros();
}

void transition()
{
  count++;
}

void loop()
{
  time = micros();
  etime=time - timep;
  if (etime>1e6) //1 second
  {
    Serial.println(count);
    timep = time; //reset timer
  }
  
}

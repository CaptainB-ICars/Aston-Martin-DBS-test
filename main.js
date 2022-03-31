video=""

object=[]

function preload()
{
    video=createVideo('DBS sc.mp4')
}

function setup()
{
    canvas=createCanvas(400,300)
    canvas.position(925,250)
    video.hide()
}

function draw()
{
    image(video,0,0,300,200)
    if(status!="")
    {
        objectDetector.detect(video,gotResult)
        for(i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected"
            document.getElementById("NOB").innerHTML="Number Of Objects Detected Are: "+object.length
            fill("black")
            percent=floor(object[i].confidence*100)
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15)
            noFill()
            stroke("black")
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
        }
    }


}

function gotResult(error,result)
{
    if(error)
    {
        console.error(error)
    }
    else
    {
        console.log(result)
        object=result
    }
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects"
}

function modelLoaded()
{
    console.log("model is loaded")
    status=true
    video.loop()
    video.speed(1)
    video.volume(1)
}






















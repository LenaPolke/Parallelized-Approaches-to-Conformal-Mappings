    //mit großer Hilfe von Aaron
      //from https://stackoverflow.com/questions/34986373/javascript-touch-event-distinguishing-finger-vs-apple-pencil
      //es lädt die Events, die auf CSCanvas passieren
      var cscanvas = document.getElementById('CSCanvas');
      //ich definiere meine Variablen
      var azimuthAngle, altitudeAngle, force;
      //EventListener werde bei dem entsprechenden Event ausgeführt
      cscanvas.addEventListener('touchstart', function(ev){
          //hier wird auf der Konsole ausgegeben, was passiert und die Werte
          //console.log("touchstart event:");
          //console.log(ev);
          //hier lese ich aus touches[0] die Werte aus, die ich brauche
          azimuthAngle=ev.touches[0].azimuthAngle;
          altitudeAngle=ev.touches[0].altitudeAngle;
          force=ev.touches[0].force;
      });

      //analog zu oben
      cscanvas.addEventListener('touchmove', function(ev){
          //console.log("touchmove event:");
          //console.log(ev);
          //vermutlich brauchen wir ev.touches[0].azimuthAngle ?
          azimuthAngle=ev.touches[0].azimuthAngle;
          altitudeAngle=ev.touches[0].altitudeAngle;
          force=ev.touches[0].force;
      });

      cscanvas.addEventListener('touchend', function(ev){
          //console.log("mousedown event:");
          //console.log(ev);

          //da ich bei mousedown keine entsprechenden Werte habe, muss ich sie anderweitig definieren und weiterverwerten
          force=0;
          azimuthAngle=-1;
          altitudeAngle=-1;
      });

      //dieser Abschnitt ist für den Fall, dass ein drucksensitives Touchpad verwendet wird
      //momentan noch nicht wirklich ausreichend funktionsfähig, deswegen auskommentiert
      /*
      cscanvas.addEventListener('webkitmouseforcechanged', function(ev){
          //console.log("forcechanged:");
          //console.log(ev.webkitForce);


          force=(ev.webkitForce-0.95)/2;

          //da ich bei mousedown keine entsprechenden Werte habe, muss ich sie anderweitig definieren und weiterverwerten
          azimuthAngle=-1;
          altitudeAngle=-1;
      });
      */

      cscanvas.addEventListener('webkitmouseforceup', function(ev){
          //console.log("webkitmouseforcewillbegin:");
          //console.log(ev);


          force=0;

          //da ich bei mousedown keine entsprechenden Werte habe, muss ich sie anderweitig definieren und weiterverwerten
          azimuthAngle=-1;
          altitudeAngle=-1;
      });



      cscanvas.addEventListener('mousedown', function(ev){
          //console.log("mousedown event:");
          //console.log(ev);

          //da ich bei mousedown keine entsprechenden Werte habe, muss ich sie anderweitig definieren und weiterverwerten
          force=0.25;
          azimuthAngle=-1;
          altitudeAngle=-1;
      });

      cscanvas.addEventListener('mouseup', function(ev){
          //console.log("mousedown event:");
          //console.log(ev);

          //da ich bei mousedown keine entsprechenden Werte habe, muss ich sie anderweitig definieren und weiterverwerten
          force=0;
          azimuthAngle=-1;
          altitudeAngle=-1;
      });



      //ToDo: beachte, dass in Zukunft auch mit dem Finger und nicht nur mit dem ApplePencil gemalt werden soll
      //entsprechend muss ich anpassen, was passiert, wenn die Werte auch in touchstart und touchmove nicht definiert werden können

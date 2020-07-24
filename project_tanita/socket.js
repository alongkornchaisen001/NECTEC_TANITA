//import 'data.js';

var socket = new WebSocket(
  "wss://tinyrpi.mozilla-iot.org/things?jwt=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVlYTBkYWQ1LTU1ZTktNDdhNC1iNDRjLWNjOTllMmI2NDU4OCJ9.eyJyb2xlIjoidXNlcl90b2tlbiIsImlhdCI6MTU5Mjk4NjkzNCwiaXNzIjoiaHR0cHM6Ly90aW55cnBpLm1vemlsbGEtaW90Lm9yZyJ9.mKGrBLqDM6lNZdmBKQuKGLmkBytCouuT44xBhXM4qT8wwE60kp4T42c2KEysLeS1kzBuJBLoRQdAl9MGtDP42A"
);

//เเจ้งเตื่อนว่า websocket ทำงานเเล้ว
socket.onopen = function () {
  console.log("SocketvConnected!");
};
//ข้อมูลที่ server ตอบกลับ
socket.onmessage = function (event) {
  var jsonObject = JSON.parse(event.data);
  var realData = JSON.parse(jsonObject.data.result);

  var date = realData[`Date`].value;
  var id = realData[`ID number`].value;
  var height = JSON.stringify(realData.Height.value, null, 2);
  var age = JSON.stringify(realData.Age.value, null, 2);
  var weight = JSON.stringify(realData.Weight.value, null, 2);
  var cloth_weight = realData[`Clothes weight`].value;
  var body_type = realData[`Body type`].value;
  var sex = realData[`Gender`].value;

  var bone_mass = realData[`Bone mass`].value;
  var fat_percent = realData[`Body fat %`].value;
  var fat_mass = realData[`Fat mass`].value;
  var bmi = realData[`BMI`].value;
  var metabolic_age = realData[`Metabolic Age`].value;
  var muscle_mass = realData[`Muscle mass`].value;

  var tbw = realData[`TBW`].value;
  var tbw_percent = realData[`TBW %`].value;
  var ecw = realData[`Extracellular water (ECW)`].value;
  var icw = realData[`Intracellular water (ICW)`].value
  var ecw_percent = realData[`ECW %`].value;
  var bmr_kj = realData[`BMR kJ`].value;
  var bmr_kcal = realData[`BMR kcal`].value;
  var viserral_fat_rating = realData[`Visceral fat rating`].value;

  var left_arm_musclemass = realData[`[Left Arm] Muscle mass`].value;
  var right_arm_musclemass = realData[`[Right Arm] Muscle mass`].value;
  var left_leg_musclemass = realData[`[Left Leg] Muscle mass`].value;
  var right_leg_musclemass = realData[`[Right Leg] Muscle mass`].value;
  var trunk_musclemass = realData[`[Trunk] Muscle mass`].value;

  var left_arm_fatmass = realData[`[Left Arm] Fat %`].value;
  var right_arm_fatmass = realData[`[Right Arm] Fat %`].value;
  var left_leg_fatmass = realData[`[Left Leg] Fat %`].value;
  var right_leg_fatmass = realData[`[Right Leg] Fat %`].value;
  var trunk_fatmass = realData[`[Trunk] Fat %`].value;

  // Extract the values for each key.
  console.log("Received data: " + JSON.stringify(realData, null, 2));
  console.log("Received data: " + realData[`[Phase angle] LL-LA (50kHz)`].value);

  //**************************************************เเสดงผลลัพท์บนหน้าเว็บ ข้อมูลทั่วไป**************************************************************************//
  document.getElementById('date').innerHTML = date;
  document.getElementById('id').innerHTML = id;
  document.getElementById('age').innerHTML = age;
  document.getElementById('height').innerHTML = height + " " + "cm";
  document.getElementById('cloth_weight').innerHTML = cloth_weight.toFixed(1) +" "+"kg";

  if (body_type == "standard") {
    document.getElementById('athelete').innerHTML = "ทั่วไป"
  } else {
    document.getElementById('athelete').innerHTML = "นักกีฬา";
  }

  if (sex == "male") {
    document.getElementById('sex').innerHTML = "ชาย";
  } else {
    document.getElementById('sex').innerHTML = "หญิง";
  }

  //*******************************************************แสดงผลลัพธ์บนหน้้าเว็บ ผลวิเคราะห์รวม******************************************************************//
  document.getElementById('body-weight').innerHTML = weight + " " + realData[`Weight`].unit;
  document.getElementById('fat-percent').innerHTML = fat_percent + " " + realData[`Body fat %`].unit;
  document.getElementById('fat-mass').innerHTML = fat_mass + " " + realData[`Fat mass`].unit;
  document.getElementById('muscle-mass').innerHTML = muscle_mass + " " + realData[`Muscle mass`].unit;
  document.getElementById('bone-mass').innerHTML = bone_mass + " " + realData[`Bone mass`].unit;
  document.getElementById('bmi').innerHTML = bmi;
  document.getElementById('metabolic-age').innerHTML = metabolic_age;
  // ------------------ ผู้ชาย - bodytype : standard -------------------//
  //DESIRABLE ===> body weight- fat percent - fatmass - musclemass - bonemass - bmi//
  if (sex === "male" && body_type == "standard") {

    var heightrange_male = [152.4, 154.9, 157.4, 160.0, 162.5, 167.6, 170.1, 172.7, 175.2, 177.8, 177.8, 180.3, 182.8, 185.4, 187.9, 190.5, 193.0];
    var weightrange_male = [45.5, 47.7, 50.0, 52.3, 53.5, 54.5, 56.8, 59.1, 61.4, 63.6, 65.9, 68.2, 70.5, 72.7, 75.0, 77.3, 79.5, 81.8, 84.1, 86.4, 88.6, 90.9];
    var bonemassrange_male = [2.5, 2.6, 2.7, 2.7, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1];

    var fatpercentrange_male = [8.0, 9.0, 10.0, 11.0, 13.0, 19.0, 21.0, 23.0, 24.0];
    var fatmassrange_male = [5.5, 6.1, 6.8, 7.5, 8.9, 13.0, 14.3, 15.7, 16.2];
    var musclemassrange_male = [21.0, 25.2, 33.0, 38.0, 39.0, 44.0, 45.0, 47.0, 49.0, 55.0, 63.0, 69.0, 72.0, 73.0];

    for (n = 0; n <= 16; n++) {
      if (heightrange_male[n] <= height && heightrange_male[n + 1] > height) {
        document.getElementById('desirable-body-weight').innerHTML = weightrange_male[i + 3].toFixed(1) + "-" + weightrange_male[i + 11].toFixed(1) + " " + "kg";
        document.getElementById('desirable-bone-mass').innerHTML = bonemassrange_male[n].toFixed(1) + "-" + bonemassrange_male[n + 1].toFixed(1)+ " "+"kg";
        document.getElementById('desirable-bmi').innerHTML = (weightrange_male[n + 3] / Math.pow(height / 100, 2) - 4).toFixed(1) + "-" + (weightrange_male[n + 3] / Math.pow(height / 100, 2) + 2).toFixed(1);
        if (age >= 5 && age < 15) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_male[3].toFixed(1) + "-" + fatpercentrange_male[8].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_male[3].toFixed(1) + "-" + fatmassrange_male[8].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_male[0].toFixed(1) + "-" + musclemassrange_male[8].toFixed(1) + " " + "kg"
        } else if (age >= 15 && age < 20) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_male[1].toFixed(1) + "-" + fatpercentrange_male[5].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_male[1].toFixed(1) + "-" + fatmassrange_male[5].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_male[4].toFixed(1) + "-" + musclemassrange_male[13].toFixed(1) + " " + "kg"
        } else if (age >= 20 && age < 40) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_male[0].toFixed(1) + "-" + fatpercentrange_male[5].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_male[0].toFixed(1) + "-" + fatmassrange_male[5].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_male[5].toFixed(1) + "-" + musclemassrange_male[12].toFixed(1) + " " + "kg"
        } else if (age >= 40 && age < 60) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_male[4].toFixed(1) + "-" + fatpercentrange_male[6].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_male[4].toFixed(1) + "-" + fatmassrange_male[6].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_male[2].toFixed(1) + "-" + musclemassrange_male[11].toFixed(1) + " " + "kg"
        } else if (age >= 60 && age < 100) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_male[4].toFixed(1) + "-" + fatpercentrange_male[8].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_male[4].toFixed(1) + "-" + fatmassrange_male[8].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_male[1].toFixed(1) + "-" + musclemassrange_male[9].toFixed(1) + " " + "kg"
        } else {
          document.getElementById('desirable-fat-percent').innerHTML = "value is overlimit";
          document.getElementById('desirable-fat-mass').innerHTML = "value is overlimit";
          document.getElementById('desirable-muscle-mass').innerHTML = "value is overlimit";
        }
      }
    }

    //TARGET ===> body weight- fat percent - fatmass - musclemass - bonemass - bmi//
    var heightLevel_male = [145, 152.4, 154.9, 157.4, 160.0, 162.5, 167.6, 170.1, 172.7, 175.2, 177.8, 177.8, 180.3, 182.8, 185.4, 187.9, 190.5, 193.0]; //  18 values - เท่ากับ bonemassLevel_male
    var weightLevel_male = [45.5, 47.7, 50.0, 52.3, 53.5, 54.5, 56.8, 59.1, 61.4, 63.6, 65.9, 68.2, 70.5, 72.7, 75.0, 77.3, 79.5, 81.8, 84.1, 86.4, 88.6, 90.9, 93.2, 95.5, 97.7];
    var bonemassLevel_male = [2.5, 2.6, 2.7, 2.7, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3]; // 18 values - เท่ากับ heightLevel_male

    var fatpercentLevel_male = [14.5, 17.5, 18.5]; // Fixed this 3 values
    var fatmassLevel_male = [0.145, 0.175, 0.185]; // Fixed this 3 values
    var musclemassLevel_male = [0.805, 0.775, 0.765] // Fixed this 3 values

    for (i = 0; i <= 16; i++) {
      if (heightLevel_male[i] <= height && heightLevel_male[i + 1] > height) {
        document.getElementById('target-body-weight').innerHTML = weightLevel_male[i].toFixed(1) + " " + "kg";
        document.getElementById('target-bone-mass').innerHTML = bonemassLevel_male[i].toFixed(1) + " " + "kg";
        document.getElementById('target-bmi').innerHTML = (weightLevel_male[i] / Math.pow(height / 100, 2)).toFixed(1);
        weight > weightLevel_male[i] ? document.getElementById('last-column-body-weight').innerHTML = "+" + (weight - weightLevel_male[i]).toFixed(1) : document.getElementById('last-column-body-weight').innerHTML = (weight - weightLevel_male[i]).toFixed(1);
        bone_mass > bonemassLevel_male[i] ? document.getElementById('last-column-bone-mass').innerHTML = "+" + (bone_mass - bonemassLevel_male[i]).toFixed(1) : document.getElementById('last-column-bone-mass').innerHTML = (bone_mass - bonemassLevel_male[i]).toFixed(1);
        bmi >= 21.5 ? document.getElementById('last-column-bmi').innerHTML = "+" + (bmi - (weightLevel_male[i] / Math.pow(height / 100, 2))).toFixed(1) : document.getElementById('last-column-bmi').innerHTML = (bmi - (weightLevel_male[i] / Math.pow(height / 100, 2))).toFixed(1);
        if (age >= 5 && age < 15) {
          document.getElementById('target-fat-percent').innerHTML = fatpercentLevel_male[1] + " " + "%";
          document.getElementById('target-fat-mass').innerHTML = (weightLevel_male[i] * fatmassLevel_male[1]).toFixed(1) + " " + "kg";
          document.getElementById('target-muscle-mass').innerHTML = (weightLevel_male[i] * musclemassLevel_male[1]).toFixed(1) + " " + "kg";
          fat_percent >= fatpercentLevel_male[1] ? document.getElementById('last-column-fat-percent').innerHTML = "+" + (fat_percent - fatpercentLevel_male[1]).toFixed(1) : document.getElementById('last-column-fat-percent').innerHTML = (fat_percent - fatpercentLevel_male[1]).toFixed(1);
          fat_mass >= (weightLevel_male[i] * fatmassLevel_male[1]).toFixed(1) ? document.getElementById('last-column-fat-mass').innerHTML = "+" + (fat_mass - (weightLevel_male[i] * fatmassLevel_male[1])).toFixed(1) : document.getElementById('last-column-fat-mass').innerHTML = (fat_mass - (weightLevel_male[i] * fatmassLevel_male[1])).toFixed(1);
          muscle_mass >= (weightLevel_male[i] * musclemassLevel_male[1]).toFixed(1) ? document.getElementById('last-column-muscle-mass').innerHTML = "+" + (muscle_mass - (weightLevel_male[i] * musclemassLevel_male[1])).toFixed(1) : document.getElementById('last-column-muscle-mass').innerHTML = (muscle_mass - (weightLevel_male[i] * musclemassLevel_male[1])).toFixed(1);
        } else if (age >= 15 && age < 40) {
          document.getElementById('target-fat-percent').innerHTML = fatpercentLevel_male[0] + " " + "%";
          document.getElementById('target-fat-mass').innerHTML = (weightLevel_male[i] * fatmassLevel_male[0]).toFixed(1) + " " + "kg";
          document.getElementById('target-muscle-mass').innerHTML = (weightLevel_male[i] * musclemassLevel_male[0]).toFixed(1) + " " + "kg";
          fat_percent >= fatpercentLevel_male[0] ? document.getElementById('last-column-fat-percent').innerHTML = "+" + (fat_percent - fatpercentLevel_male[0]).toFixed(1) : document.getElementById('last-column-fat-percent').innerHTML = (fat_percent - fatpercentLevel_male[0]).toFixed(1);
          fat_mass >= (weightLevel_male[i] * fatmassLevel_male[0]).toFixed(1) ? document.getElementById('last-column-fat-mass').innerHTML = "+" + (fat_mass - (weightLevel_male[i] * fatmassLevel_male[0])).toFixed(1) : document.getElementById('last-column-fat-mass').innerHTML = (fat_mass - (weightLevel_male[i] * fatmassLevel_male[0])).toFixed(1);
          muscle_mass >= (weightLevel_male[i] * musclemassLevel_male[0]).toFixed(1) ? document.getElementById('last-column-muscle-mass').innerHTML = "+" + (muscle_mass - (weightLevel_male[i] * musclemassLevel_male[0])).toFixed(1) : document.getElementById('last-column-muscle-mass').innerHTML = (muscle_mass - (weightLevel_male[i] * musclemassLevel_male[0])).toFixed(1);
        } else if (age >= 40 && age < 60) {
          document.getElementById('target-fat-percent').innerHTML = fatpercentLevel_male[1] + " " + "%";
          document.getElementById('target-fat-mass').innerHTML = (weightLevel_male[i] * fatmassLevel_male[1]).toFixed(1) + " " + "kg";
          document.getElementById('target-muscle-mass').innerHTML = (weightLevel_male[i] * musclemassLevel_male[1]).toFixed(1) + " " + "kg";
          fat_percent >= fatpercentLevel_male[1] ? document.getElementById('last-column-fat-percent').innerHTML = "+" + (fat_percent - fatpercentLevel_male[1]).toFixed(1) : document.getElementById('last-column-fat-percent').innerHTML = (fat_percent - fatpercentLevel_male[1]).toFixed(1);
          fat_mass >= (weightLevel_male[i] * fatmassLevel_male[1]).toFixed(1) ? document.getElementById('last-column-fat-mass').innerHTML = "+" + (fat_mass - (weightLevel_male[i] * fatmassLevel_male[1])).toFixed(1) : document.getElementById('last-column-fat-mass').innerHTML = (fat_mass - (weightLevel_male[i] * fatmassLevel_male[1])).toFixed(1);
          muscle_mass >= (weightLevel_male[i] * musclemassLevel_male[1]).toFixed(1) ? document.getElementById('last-column-muscle-mass').innerHTML = "+" + (muscle_mass - (weightLevel_male[i] * musclemassLevel_male[1])).toFixed(1) : document.getElementById('last-column-muscle-mass').innerHTML = (muscle_mass - (weightLevel_male[i] * musclemassLevel_male[1])).toFixed(1);
        } else if (age >= 60 && age < 100) {
          document.getElementById('target-fat-percent').innerHTML = fatpercentLevel_male[2] + " " + "%";
          document.getElementById('target-fat-mass').innerHTML = (weightLevel_male[i] * fatmassLevel_male[2]).toFixed(1) + " " + "kg";
          document.getElementById('target-muscle-mass').innerHTML = (weightLevel_male[i] * musclemassLevel_male[2]).toFixed(1) + " " + "kg";
          fat_percent >= fatpercentLevel_male[2] ? document.getElementById('last-column-fat-percent').innerHTML = "+" + (fat_percent - fatpercentLevel_male[2]).toFixed(1) : document.getElementById('last-column-fat-percent').innerHTML = (fat_percent - fatpercentLevel_male[2]).toFixed(1);
          fat_mass >= (weightLevel_male[i] * fatmassLevel_male[2]).toFixed(1) ? document.getElementById('last-column-fat-mass').innerHTML = "+" + (fat_mass - (weightLevel_male[i] * fatmassLevel_male[2])).toFixed(1) : document.getElementById('last-column-fat-mass').innerHTML = (fat_mass - (weightLevel_male[i] * fatmassLevel_male[2])).toFixed(1);
          muscle_mass >= (weightLevel_male[i] * musclemassLevel_male[2]).toFixed(1) ? document.getElementById('last-column-muscle-mass').innerHTML = "+" + (muscle_mass - (weightLevel_male[i] * musclemassLevel_male[2])).toFixed(1) : document.getElementById('last-column-muscle-mass').innerHTML = (muscle_mass - (weightLevel_male[i] * musclemassLevel_male[2])).toFixed(1);
        } else {
          document.getElementById('target-body-weight').innerHTML = "value is overlimit";
          document.getElementById('target-fat-percent').innerHTML = "value is overlimit";
          document.getElementById('target-fat-mass').innerHTML = "value is overlimit";
          document.getElementById('target-muscle-mass').innerHTML = "value is overlimit";
          document.getElementById('target-bone-mass').innerHTML = "value is overlimit";
          document.getElementById('target-bmi').innerHTML = "value is overlimit";

          document.getElementById('last-column-body-weight').innerHTML = "value is overlimit";
          document.getElementById('last-column-fat-percent').innerHTML = "value is overlimit";
          document.getElementById('last-column-fat-mass').innerHTML = "value is overlimit";
          document.getElementById('last-column-muscle-mass').innerHTML = "value is overlimit";
          document.getElementById('last-column-bone-mass').innerHTML = "value is overlimit";
          document.getElementById('last-column-bmi').innerHTML = "value is overlimit";
        }
      }
    }

  } else if (sex == "male" && body_type == "athelete") {
    // ------------------ ผู้ชาย - bodytype : athelete-------------------//
    //DESIRABLE ===> body weight- fat percent - fatmass - musclemass-- bonemass - bmi//
    //TARGET ===> body weight- fat percent - fatmass - musclemass-- bonemass - bmi//
    //ไว้ภายหลัง

  } else if (sex == "female" && body_type == "standard") {
    // ------------------ ผู้หญิง - bodytype : standard -------------------//
    //DESIRABLE ===> body weight- fat percent - fatmass - musclemass-- bonemass - bmi//
    //ค่าตามมาตรฐาน
    var heightrange_female = [152.4, 154.9, 157.4, 160.0, 162.5, 167.6, 170.1, 172.7, 175.2, 177.8, 177.8, 180.3, 182.8, 185.4, 187.9, 190.5, 193.0];
    var weightrange_female = [45.5, 47.7, 50.0, 52.3, 53.5, 54.5, 56.8, 59.1, 61.4, 63.6, 65.9, 68.2, 70.5, 72.7, 75.0, 77.3, 79.5, 81.8, 84.1, 86.4, 88.6, 90.9];
    var bonemassrange_female = [2.5, 2.6, 2.7, 2.7, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1];

    var fatpercentrange_female = [13.0, 14.0, 15.0, 17.0, 19.0, 21.0, 23.0, 24.0, 28.0, 30.0, 31.0, 32.0, 33.0, 35.0]; // 14 VALUES
    var fatmassrange_female = [8.6, 9.3, 10.0, 11.2, 12.6, 13.9, 15.2, 15.9, 18.5, 19.8, 20.5, 21.1, 21.8, 23.1]; //14 VALUEES
    var musclemassrange_female = [22, 26, 34, 45, 48, 49, 53, 66, 67, 68, 69]; // NO FIXED

    for (n = 0; n <= 16; n++) {
      if (heightrange_female[n] <= height && heightrange_female[n + 1] > height) {
        document.getElementById('desirable-body-weight').innerHTML = weightrange_female[i + 3].toFixed(1) + "-" + weightrange_female[i + 11].toFixed(1) + " " + "kg";
        document.getElementById('desirable-bone-mass').innerHTML = bonemassrange_female[n].toFixed(1) + "-" + bonemassrange_female[n + 1].toFixed(1) + "kg";
        document.getElementById('desirable-bmi').innerHTML = (weightrange_female[n + 3] / Math.pow(height / 100, 2) - 4).toFixed(1) + "-" + (weightrange_female[n + 3] / Math.pow(height / 100, 2) + 2).toFixed(1);
        if (age >= 5 && age < 15) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_female[0].toFixed(1) + "-" + fatpercentrange_female[9].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_female[0].toFixed(0) + "-" + fatmassrange_female[9].toFixed(0) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_female[0].toFixed(1) + "-" + musclemassrange_female[4].toFixed(1) + " " + "kg"
        } else if (age >= 15 && age < 20) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_female[0].toFixed(1) + "-" + fatpercentrange_male[10].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_female[0].toFixed(1) + "-" + fatmassrange_female[10].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_female[4].toFixed(1) + "-" + musclemassrange_female[8].toFixed(1) + " " + "kg"
        } else if (age >= 20 && age < 40) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_female[5].toFixed(1) + "-" + fatpercentrange_female[11].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_female[5].toFixed(1) + "-" + fatmassrange_female[11].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_female[2].toFixed(1) + "-" + musclemassrange_female[10].toFixed(1) + " " + "kg"
        } else if (age >= 40 && age < 60) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_female[6].toFixed(1) + "-" + fatpercentrange_female[12].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_female[6].toFixed(1) + "-" + fatmassrange_female[12].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_female[2].toFixed(1) + "-" + musclemassrange_female[9].toFixed(1) + " " + "kg"
        } else if (age >= 60 && age < 100) {
          document.getElementById('desirable-fat-percent').innerHTML = fatpercentrange_female[7].toFixed(1) + "-" + fatpercentrange_female[14].toFixed(1) + " " + "%";
          document.getElementById('desirable-fat-mass').innerHTML = fatmassrange_female[7].toFixed(1) + "-" + fatmassrange_female[14].toFixed(1) + " " + "kg";
          document.getElementById('desirable-muscle-mass').innerHTML = musclemassrange_female[0].toFixed(1) + "-" + musclemassrange_female[7].toFixed(1) + " " + "kg"
        } else {
          document.getElementById('desirable-fat-percent').innerHTML = "value is overlimit";
          document.getElementById('desirable-fat-mass').innerHTML = "value is overlimit";
          document.getElementById('desirable-muscle-mass').innerHTML = "value is overlimit";
        }
      }
    }

    //TARGET ===> body weight- fat percent - fatmass - musclemass-- bonemass - bmi//
    var heightLevel_female = [145, 152.4, 154.9, 157.4, 160.0, 162.5, 167.6, 170.1, 172.7, 175.2, 177.8, 177.8, 180.3, 182.8, 185.4, 187.9, 190.5, 193.0];
    var bonemassLevel_female = [2.5, 2.6, 2.7, 2.7, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1];
    var fatpercentLevel_female = [28.0, 29.0, 30.0]; // Fixed this 3 values
    var fatmassLevel_female = [0.28, 0.29, 0.30]; // Fixed this 3 values
    var musclemassLevel_female = [0.67, 0.66, 0.65] // Fixed this 3 values
    var weightLevel_female = [50.0, 52.3, 53.5, 54.5, 56.8, 59.1, 61.4, 63.6, 65.9, 68.2, 70.5, 72.7, 75.0, 77.3, 79.5, 81.8];  //add later - use weight_index

    for (i = 0; i <= 16; i++) {
      if (heightLevel_female[i] <= height && heightLevel_female[i + 1] > height) {
        document.getElementById('target-body-weight').innerHTML = weightLevel_female[i].toFixed(1) + " " + "kg";
        document.getElementById('target-bone-mass').innerHTML = bonemassLevel_female[i].toFixed(1) + " " + "kg";
        document.getElementById('target-bmi').innerHTML = (weightLevel_female[i] / Math.pow(height / 100, 2)).toFixed(1) + " " + "kg";
        weight > weightLevel_female[i] ? document.getElementById('last-column-body-weight').innerHTML = "+" + (weight - weightLevel_female[i]).toFixed(1) : document.getElementById('last-column-body-weight').innerHTML = (weight - weightLevel_female[i]).toFixed(1);
        bone_mass > bonemassLevel_female[i] ? document.getElementById('last-column-bone-mass').innerHTML = "+" + (bone_mass - bonemassLevel_female[i]).toFixed(1) : document.getElementById('last-column-bone-mass').innerHTML = (bone_mass - bonemassLevel_female[i]).toFixed(1);
        bmi >= 21.5 ? document.getElementById('last-column-bmi').innerHTML = "+" + (bmi - (weightLevel_male[i] / Math.pow(height / 100, 2))).toFixed(1) : document.getElementById('last-column-bmi').innerHTML = (bmi - (weightLevel_male[i] / Math.pow(height / 100, 2))).toFixed(1);
        if (age >= 0 && age < 40) {
          document.getElementById('target-fat-percent').innerHTML = fatpercentLevel_female[0] + " " + "%";
          document.getElementById('target-fat-mass').innerHTML = (weightLevel_female[i] * fatmassLevel_female[0]).toFixed(1) + " " + "kg";
          document.getElementById('target-muscle-mass').innerHTML = (weightLevel_female[i] * musclemassLevel_female[0]).toFixed(1) + " " + "kg";
          fat_percent >= fatpercentLevel_female[0] ? document.getElementById('last-column-fat-percent').innerHTML = "+" + (fat_percent - fatpercentLevel_female[0]).toFixed(1) : document.getElementById('last-column-fat-percent').innerHTML = (fat_percent - fatpercentLevel_female[0]).toFixed(1);
          fat_mass >= (weightLevel_female[i] * fatmassLevel_female[0]).toFixed(1) ? document.getElementById('last-column-fat-mass').innerHTML = "+" + (fat_mass - (weightLevel_female[i] * fatmassLevel_female[0])).toFixed(1) : document.getElementById('last-column-fat-mass').innerHTML = (fat_mass - (weightLevel_female[i] * fatmassLevel_female[0])).toFixed(1);
          muscle_mass >= (weightLevel_female[i] * musclemassLevel_female[0]).toFixed(1) ? document.getElementById('last-column-muscle-mass').innerHTML = "+" + (muscle_mass - (weightLevel_female[i] * musclemassLevel_female[0])).toFixed(1) : document.getElementById('last-column-muscle-mass').innerHTML = (muscle_mass - (weightLevel_female[i] * musclemassLevel_female[0])).toFixed(1);
        } else if (age >= 40 && age < 60) {
          document.getElementById('target-fat-percent').innerHTML = fatpercentLevel_female[1] + " " + "%";
          document.getElementById('target-fat-mass').innerHTML = (weightLevel_female[i] * fatmassLevel_female[1]).toFixed(1) + " " + "kg";
          document.getElementById('target-muscle-mass').innerHTML = (weightLevel_female[i] * musclemassLevel_female[1]).toFixed(1) + " " + "kg";
          fat_percent >= fatpercentLevel_female[1] ? document.getElementById('last-column-fat-percent').innerHTML = "+" + (fat_percent - fatpercentLevel_female[1]).toFixed(1) : document.getElementById('last-column-fat-percent').innerHTML = (fat_percent - fatpercentLevel_female[1]).toFixed(1);
          fat_mass >= (weightLevel_female[i] * fatmassLevel_female[1]).toFixed(1) ? document.getElementById('last-column-fat-mass').innerHTML = "+" + (fat_mass - (weightLevel_female[i] * fatmassLevel_female[1])).toFixed(1) : document.getElementById('last-column-fat-mass').innerHTML = (fat_mass - (weightLevel_female[i] * fatmassLevel_female[1])).toFixed(1);
          muscle_mass >= (weightLevel_female[i] * musclemassLevel_female[1]).toFixed(1) ? document.getElementById('last-column-muscle-mass').innerHTML = "+" + (muscle_mass - (weightLevel_female[i] * musclemassLevel_female[1])).toFixed(1) : document.getElementById('last-column-muscle-mass').innerHTML = (muscle_mass - (weightLevel_female[i] * musclemassLevel_female[1])).toFixed(1);
        } else if (age >= 60 && age < 100) {
          document.getElementById('target-fat-percent').innerHTML = fatpercentLevel_female[2] + " " + "%";
          document.getElementById('target-fat-mass').innerHTML = (weightLevel_female[i] * fatmassLevel_female[2]).toFixed(1) + " " + "kg";
          document.getElementById('target-muscle-mass').innerHTML = (weightLevel_female[i] * musclemassLevel_female[2]).toFixed(1) + " " + "kg";
          fat_percent >= fatpercentLevel_female[2] ? document.getElementById('last-column-fat-percent').innerHTML = "+" + (fat_percent - fatpercentLevel_female[2]).toFixed(1) : document.getElementById('last-column-fat-percent').innerHTML = (fat_percent - fatpercentLevel_female[2]).toFixed(1);
          fat_mass >= (weightLevel_female[i] * fatmassLevel_female[2]).toFixed(1) ? document.getElementById('last-column-fat-mass').innerHTML = "+" + (fat_mass - (weightLevel_female[i] * fatmassLevel_female[2])).toFixed(1) : document.getElementById('last-column-fat-mass').innerHTML = (fat_mass - (weightLevel_female[i] * fatmassLevel_female[2])).toFixed(1);
          muscle_mass >= (weightLevel_female[i] * musclemassLevel_female[2]).toFixed(1) ? document.getElementById('last-column-muscle-mass').innerHTML = "+" + (muscle_mass - (weightLevel_female[i] * musclemassLevel_female[2])).toFixed(1) : document.getElementById('last-column-muscle-mass').innerHTML = (muscle_mass - (weightLevel_female[i] * musclemassLevel_female[2])).toFixed(1);
        } else {
          document.getElementById('target-body-weight').innerHTML = "value is overlimit";
          document.getElementById('target-fat-percent').innerHTML = "value is overlimit";
          document.getElementById('target-fat-mass').innerHTML = "value is overlimit";
          document.getElementById('target-muscle-mass').innerHTML = "value is overlimit";
          document.getElementById('target-bone-mass').innerHTML = "value is overlimit";
          document.getElementById('target-bmi').innerHTML = "value is overlimit";

          document.getElementById('last-column-body-weight').innerHTML = "value is overlimit";
          document.getElementById('last-column-fat-percent').innerHTML = "value is overlimit";
          document.getElementById('last-column-fat-mass').innerHTML = "value is overlimit";
          document.getElementById('last-column-muscle-mass').innerHTML = "value is overlimit";
          document.getElementById('last-column-bone-mass').innerHTML = "value is overlimit";
          document.getElementById('last-column-bmi').innerHTML = "value is overlimit";
        }
      }
    }

  } else {
    // ------------------ ผู้หญิง - bodytype : athelete -------------------//
    //DESIRABLE ===> body weight- fat percent - fatmass - musclemass-- bonemass - bmi//
    //TARGET ===> body weight- fat percent - fatmass - musclemass-- bonemass - bmi//
    //ไว้ภายหลัง
  }

  //******************************************************แสดงผลลัพธ์บนหน้้าเว็บ BMR VFA TBW*********************************************************************//
  document.getElementById('tbw-kg').innerHTML = tbw + realData[`TBW`].unit;
  document.getElementById('tbw-percent').innerHTML = tbw_percent + realData[`TBW %`].unit;
  document.getElementById('ecw').innerHTML = ecw;
  document.getElementById('icw').innerHTML = icw;
  document.getElementById('ecwtbw-percent').innerHTML = ecw_percent + realData[`ECW %`].unit;
  if (ecw_percent < 30) {
    document.getElementById('progress-ecwtbw-percent').innerHTML = "ระดับต่ำกว่าปกติ : '< 30 %' ";
  } else if (ecw_percent >= 30 && ecw_percent < 40) {
    document.getElementById('progress-ecwtbw-percent').innerHTML = "ระดับปกติ : ' 30 - 40 % '";
  } else {
    document.getElementById('progress-ecwtbw-percent').innerHTML = "ระดับสูงกว่าปกติ : ' > 40 % '";
  }
  document.getElementById('bmr-kj').innerHTML = bmr_kj + " " + realData[`BMR kJ`].unit;
  document.getElementById('bmr-kcal').innerHTML = bmr_kcal + " " + realData[`BMR kcal`].unit;


  if (bmr_kcal >= 0 && bmr_kcal < 900) {
    document.getElementById('progress-bmr-kcal').innerHTM = "อัตราการเผาผลาญพลังงานต่ำ : < 900 "
  } else if (bmr_kcal >= 900 && bmr_kcal < 1500) {
    document.getElementById('progress-bmr-kcal').innerHTM = "อัตราการเผาผลาญพลังงานปกติ : 900 - 1500 ";
  } else {
    document.getElementById('progress-bmr').innerHTML = "อัตราการเผาผลาญพลังงานสูง : > 1500 ";
  }


  document.getElementById('viserral-fat-rating').innerHTML = viserral_fat_rating;
  if (viserral_fat_rating > 0 && viserral_fat_rating <= 13) {
    document.getElementById('progress-viserral-fat-rating').innerHTML = "ระดับปกติ : ' < 13'";
  } else if (viserral_fat_rating > 13 && viserral_fat_rating <= 18) {
    document.getElementById('progress-viserral-fat-rating').innerHTML = "ระดับเริ่มมีความเสี่ยง : ' 13 - 18 ' ";
  } else {
    document.getElementById('progress-viserral-fat-rating').innerHTML = "ระดับมีความเสี่ยง : ' > 18 '";
  }

  //************************************************เเสดงผลลัพท์บนหน้าเว็บ Segment Analysis********************************************************************//
  document.getElementById('top-left-muscle').innerHTML = left_arm_musclemass + realData[`[Left Arm] Muscle mass`].unit;
  document.getElementById('top-right-muscle').innerHTML = right_arm_musclemass + realData[`[Right Arm] Muscle mass`].unit;
  document.getElementById('bottom-left-muscle').innerHTML = left_leg_musclemass + realData[`[Left Leg] Muscle mass`].unit;
  document.getElementById('bottom-right-muscle').innerHTML = right_leg_musclemass + realData[`[Right Leg] Muscle mass`].unit;
  document.getElementById('top-center-muscle').innerHTML = trunk_musclemass + realData[`[Trunk] Muscle mass`].unit;

  document.getElementById('top-left-trunk').innerHTML = left_arm_fatmass + realData[`[Right Arm] Muscle mass`].unit;
  document.getElementById('top-right-trunk').innerHTML = right_arm_fatmass + realData[`[Left Leg] Muscle mass`].unit;
  document.getElementById('bottom-left-trunk').innerHTML = left_leg_fatmass + realData[`[Right Leg] Muscle mass`].unit;
  document.getElementById('bottom-right-trunk').innerHTML = right_leg_fatmass + realData[`[Trunk] Muscle mass`].unit;
  document.getElementById('top-center-trunk').innerHTML = trunk_fatmass + realData[`[Left Arm] Muscle mass`].unit;

};

//เเสดงเตื่อนในกรณีเชื่อมต่อไมได้
socket.onclose = function (event) {
  console.log("Lost connection!");
  alert('ขออภัยระบบมีปัญหา');
};

//เเจ้งเตื่อนในกรณีเชื่อมต่อเกิด  error
socket.onerror = function () {
  console.log("Error!");
};
//return socket.send('hello, world!');
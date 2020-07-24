document.getElementById("addPost").addEventListener("submit", tanita);

function check() {
  if (document.getElementById('Name').value == "") {

    alert('กรุณากรอกชื่อ-นามสกุล');
    document.addPost.focus();
    return false;

  } else if (document.getElementById('Age').value == "") {

    alert('กรุณากรอกอายุ');
    document.addPost.focus();
    return false;

  } else if (addPost.Sex.selectedIndex == 0) {

    alert('กรุณาเลือกเพศด้วยค่ะ');
    document.addPost.focus();
    return false;

  } else if (document.getElementById('Height').value == "") {

    alert('กรุณากรอกส่วยสูงด้วยค่ะ');
    document.addPost.focus();
    return false;

  } else if (document.getElementById('Cloth').value == "") {

    alert('กรุณากรอกน้ำหนักเสื้อผ้า');
    document.addPost.focus();
    return false;

  } else if (addPost.Athelete.selectedIndex == 0) {

    alert('กรุณาเลือกสภาพทางร่างกายด้วยค่ะ');
    document.addPost.focus();
    return false;

  } else if (document.getElementById('InputID').value == "") {

    alert('กรุณากรอกID');
    document.addPost.focus();
    return false;

  } else if (document.getElementById('checkbox').checked == false) {

    alert('กรุณากดปุ่มยินยอมรับข้อกำหนดการให้บริการด้วยค่ะ');
    document.addPost.focus();
    return false;

  } else {
    return true;
  }

}

async function tanita(data) {
  data.preventDefault();

  var age = document.getElementById("Age").value;
  var sex = document.getElementById("Sex").value;
  var height = document.getElementById("Height").value;
  var cloth = document.getElementById("Cloth").value;
  let body = document.getElementById("Athelete").value;
  let id = document.getElementById("InputID").value;;
  let age_num = parseInt(age);
  let height_num = parseFloat(height);
  let weight_num = parseFloat(cloth);
  var name = document.getElementById("Name").value;
  console.log(name);
  //window.documentElement('name_result'), innerHTML = name; /*Fixed later*/

  fetch("https://tinyrpi.mozilla-iot.org/things/brew-0/actions", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVlYTBkYWQ1LTU1ZTktNDdhNC1iNDRjLWNjOTllMmI2NDU4OCJ9.eyJyb2xlIjoidXNlcl90b2tlbiIsImlhdCI6MTU5Mjk4NjkzNCwiaXNzIjoiaHR0cHM6Ly90aW55cnBpLm1vemlsbGEtaW90Lm9yZyJ9.mKGrBLqDM6lNZdmBKQuKGLmkBytCouuT44xBhXM4qT8wwE60kp4T42c2KEysLeS1kzBuJBLoRQdAl9MGtDP42A",
    },
    body: JSON.stringify({
      brew: {
        input: {
          bodytype: body,
          gender: sex,
          age: age_num,
          cloth: weight_num,
          height: height_num,
          id: id,
        },
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      var valueOfhimunity = {};
      valueOfhimunity = data;
      //document.getElementById('output').innerHTML = JSON.stringify(valueOfhimunity, null, 2);
      console.log(data);
      window.location.href = 'page2.html'
    });
}   
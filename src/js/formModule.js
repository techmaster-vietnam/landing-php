export function initForm() {
    const successModal = document.getElementById("successModal");
    successModal.addEventListener("click", toggleModal);
  
    document.getElementById("btn-register").addEventListener("click", handleSubmit);
  }
  
  function checkValid(name, phone, email) {
    let valid = true;
    const fields = [
      { elem: name, message: ".name-message", text: "Vui lòng nhập đúng họ tên" },
      { elem: phone, message: ".phone-message", text: "Vui lòng nhập đúng số điện thoại" },
      { elem: email, message: ".email-message", text: "Vui lòng nhập đúng email" }
    ];
  
    fields.forEach(field => {
      const messageElem = document.querySelector(field.message);
      if (field.elem.value.trim() === "" || (field.elem === email && !field.elem.value.includes("@"))) {
        setInvalid(field.elem, messageElem, field.text);
        valid = false;
      } else {
        setValid(field.elem, messageElem);
      }
    });
  
    return valid;
  }
  
  function setInvalid(elem, messageElem, text) {
    elem.classList.remove("valid");
    elem.classList.add("invalid");
    messageElem.innerText = text;
  }
  
  function setValid(elem, messageElem) {
    elem.classList.remove("invalid");
    elem.classList.add("valid");
    messageElem.innerText = "";
  }
  
  function toggleModal() {
    const body = document.querySelector("body");
    successModal.classList.toggle("showUp");
    body.classList.toggle("preventScroll");
  }
  
  function handleSubmit(e) {
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const note = document.getElementById("note");
  
    if (checkValid(name, phone, email)) {
      const req = {
        FullName: name.value,
        Email: email.value,
        Phone: phone.value,
        Note: note.value,
        Link: window.location.href,
        ItemId: "99NwITI0",
      };
  
      $.ajax({
        url: "https://techmaster.vn/submit-advisory",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(req),
        dataType: "json",
        success: function () {
          [name, phone, email, note].forEach(elem => {
            elem.value = "";
            elem.classList.remove("valid");
          });
          toggleModal();
        },
        error: function (result) {
          console.error(result);
        },
      });
    }
  }
(() => {
  const form = document.querySelector('form');
  const url = "http://localhost:9000/getuser";
  form.onsubmit = e => {
    e.preventDefault();

    // Prepare data to send
    const data = {};
    const formElements = Array.from(form);
    console.log(formElements);
    formElements.map(input => (data[input.name] = input.value));

    // Log what our lambda function will receive
    console.log(JSON.stringify(data));
    $.post(url,JSON.stringify(data),(d,s)=>{
      console.log(`${d} -- status -> ${s}`);
    })
    window.location = "user.html";
  };
})();
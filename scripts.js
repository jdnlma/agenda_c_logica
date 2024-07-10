/**
 * Authors:Wilton & Raniele
 * Version: 1
 * Project: Agenda de contatos com HTML5, Tailwid cc e, Javascript  es6 e Localstorage
 */

//Obtém referências aosn Elementos do Navegador (DOM)
const contactForm = document.getElementById("contactForm");
const flahsMessage = document.getElementById("flahsMessage");
const contactList = document.getElementById("contactList");

//Manipulador de eventos de envio do formulário
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const editingId = event.submitter.dataset.editingId;

  //Verificar se o ID existe no banco de dados
  if (editingId) {
    updateContact(editingId);
  } else {
    saveContact();
  }
});

//Função para salvar o contato no localstorage
function saveContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const birdhate = document.getElementById("birdhate").value;

  //Criaçaõ do ID do contato
  const id = Date.now().toString();
  contact = { id, name, phone, email, birdhate };

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  //Salvar o contato
  contacts.push(contact);
  localStorage.setItem("contacts".JSON.stringify(contacts));
  showFlashMessage("Contato salvo com sucesso!");
  contactForm.reset();
  displayContacts();
}

//Função para exibir a mensagem flash
function showFlashMessage(message) {
  flahsMessage.textContent(message);
  flahsMessage.classList.remove("hidden");
  setTimeout(() => {
    flahsMessage.classList.add("hidden");
  }, 5000);
}

//Função para exibir os contatos na tabela
function displayContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contactList.innerHTML = ""[ //Limpar a tabela antes de exibir
    //Cria o cabeçalho da tabela
    ("Nome", "Telefone", "E-mail", "Data de Nascimento", "Ações")
  ]
    .forEach(headerText => {
      const headerCell = headerRow.inserCell();
      headerCell.textContent = headerText;
      headerCell.classList.add(
        "px-4",
        "p-2",
        "bg-gray-200",
        "text-gray-800",
        "font-bold"
      ); //Estilo do cabeçalho
    });

  contacts.forEach((contact) => {
    const row = contactList
      .insertRow()

      [
        //Excluimos o 'birdthate' para corrirgimos o formato da data
        ("name", "phone", "email")
      ].forEach((key) => {
        const cell = row.insertCell();
        cell.textContent = contact[key];
        cell.classList.add("border-t", "px-4", "py-2"); //Estilização das células
      });

    //Formata a data de nascimento para o formato brasileiro
    const birdhateCell = row.insertCell();
    const [year, month, day] = contact.birdhate.split("-"); //Separa os componentes da data
    const birdhate = new Date(year, month - 1, day); // Formatando a data do padrão brasileiro

    const formattedBirdhate = birdhate.toLocaleDateString("pt-BR");
    birdhateCell.textContent = formattedBirdhate;
    birdhateCell.classList.add("border-t", "px-4", "py-2");

    //Insere os botões nas celulas
    const actionCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.innerHTML = "<=i class='fas fa-edit'></i>";
    editButton.classList.add(
      "bg-yellow-500",
      "hover:bg-yellow-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    editButton.addEventListener("click", () => editContact(contact.id));
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<=i class='fas fa-trash-alt'></i>";
    deleteButton.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "ml-2"
    );
    deleteButton.addEventListener("click", () => deleteContact(contact.id));
    actionCell.appendChild(deleteButton);
  });
}

//Função para editar um contato
function editContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts.find((c) => c.id === id);

  //Preenche oa campos do formulário
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  document.getElementById("birtdhate").value = contact.birdhate;

  const submitButton = document.querySelector(
    "#contactForm Button[type='submit']"
  );

  submitButton.textContent = "Atualizar";
  submitButton.dataset.editingId = id;

  //limpa o formulário
  contactForm.addEventListener("reset").value,
    () => {
      submitButton.textContent = "Salvar";
      delete submitButton.dataset.editingld;
    };
}
//Função para excluir um contato
function deletContact(id) {
  const contacts = JSON.parse(localStorage.getItem(contacts)) || [];

  const updateContacts = contacts.filter((c) => c.id !== id);
  localStorage.setItem("contacts", JSON.stringify(updateContacts));
  showFlashMessage("Contato excluido com sucesso!");
  displayContacts(); //Atualiza a tabela após excluir
}

//Função  para atualizar um contato existente
function updateContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contatos.findIndex((c) => c.id === id);

  //Preenche oa campos do formulário
  if (index !== -1) {
    contacts[index] = {
      name: (document.getElementById("name").value = contact.name),
      phone: (document.getElementById("phone").value = contact.phone),
      email: (document.getElementById("email").value = contact.email),
      birdhate: (document.getElementById("birtdhate").value = contact.birdhate),
    };

    localStorage.setItem("contacts", JSON.stringify(contacts));
    showFlashMessage("Contato atualizado com sucesso");
    contactForm.reset(); //Limpa o formulário
    displayContacts(); // Atualiza a tabela após atualizar o contato
  }
}

//Chama a função para exibir os contatos ao carregar a página
displayContacts();

Crie uma pagina de pacientes. Esta página deve ter o botao de "Adicionar paciente". Este botao abrira um Dialog com um formulario.
Este formulario tera os seguintes campos:
- Nome do paciente
- E-mail
- Numero de Telefone (com máscara)
- Sexo: select com duas opcoes, "Masculino" e "Feminino""

Crie um componente "AddPatientButton" que renderizara o componente "UpsertPatientForm".

Ao enviar o formulario chame uma nova server action, que vai fazer upsert do paciente no banco de dados.
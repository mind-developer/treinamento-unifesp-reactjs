import React, {useEffect, useState} from 'react'
import { Table, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import api from '../../services/api'
import Modal from '../Modal'

export default function UsersList() {
  const [usuarios, setUsuarios] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [userSelected, setUserSelected] = useState(false)

  const handleOpenModal = (event, user) => {
    const newUser = {...user}
    setUserSelected(newUser)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setUserSelected(false)
  }

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('usuarios')

      console.log(response)
      setUsuarios(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const handleInputChange = (event) => {
    const name = event.target.name
    const value = name === 'status' ? event.target.value === 'true' : event.target.value

    setUserSelected((oldUserSelected) => {
      oldUserSelected[name] = value
      return oldUserSelected
    })

  }

  const updateUser = async (data) => {
    try {
      const response = await api.put('usuarios/' + data.id, data)

      toast.success("Usuário atualizado com sucesso!")

      fetchUsuarios()
      handleCloseModal()
      // console.log(response.data)
    } catch (error) {
      console.log(error)
      toast.error("Houve um erro no servidor, tente novamente mais tarde.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser(userSelected)
  }

  const deleteUser = async (e) => {
    e.preventDefault()

    try {
      const response = await api.delete('usuarios/' + userSelected.id)

      toast.success("Usuário deletado com sucesso!")

      fetchUsuarios()
      handleCloseModal()


    } catch (error) {
      console.log(error)
      toast.error("Houve um erro no servidor, tente novamente mais tarde.")
    }
  }

  const ModalBody = (props) => {
    return (
      <Form>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control name="first_name" defaultValue={userSelected.first_name} onChange={(event) => handleInputChange(event)} />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control name="last_name" defaultValue={userSelected.last_name} onChange={(event) => handleInputChange(event)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control name="email" defaultValue={userSelected.email} onChange={(event) => handleInputChange(event)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Job</Form.Label>
          <Form.Control name="job" defaultValue={userSelected.job} onChange={(event) => handleInputChange(event)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" name="status" defaultValue={userSelected.status} onChange={(event) => handleInputChange(event)}>
            <option value="" hidden>Selecione uma opção</option>
            <option value="true">Ativo</option>
            <option value="false">Desativado</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Button variant="danger" style={{ float: 'left' }} type="button" onClick={(e) => deleteUser(e)}>Excluir</Button>
          <Button variant="primary" style={{ float: 'right' }} type="button" onClick={(e) => handleSubmit(e)}>Salvar</Button>
        </Form.Group>
      </Form>
    )
  }

  return (
    <div>
      <Modal 
        show={showModal} 
        handleClose={handleCloseModal}
        modalHead={<h1>{userSelected.first_name}</h1>}
        modalBody={<ModalBody />}
      />

      <h1>Users List</h1>
      {usuarios && (
        <Table hover striped bordered >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              {/* <th>Cargo</th>
              <th>IP</th> */}
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user, i) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                {/* <td>{user.job}</td> */}
                {/* <td>{user.ip_address}</td> */}
                <td>{user.status ? 'Ativo' : 'Desativado'}</td>
                <td>
                  <Button variant="warning" onClick={(event) => handleOpenModal(event, user)}>Editar</Button>
                </td>
              </tr>
            ))}  
          </tbody>
        </Table>
      )}
    </div>
  )
}

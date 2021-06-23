import styled from 'styled-components';
import Form from './Form';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Link , useLocation, useHistory, useParams} from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Config from '../helper_functions/Config';
class EmptyForm{
  constructor(){
    this.value = "";
    this.description = "";
  }
}

export default function NewLog(){
  const {user} = useContext(UserContext);
  const [formState, setFormState] = useState(new EmptyForm());

  const {logType} = useParams();
  const history = useHistory();

  const submitLog = () =>{
    const path = logType === "expenditure" ? "/new/expenditure" : "/new/earning"
    const body = {...formState};

    body.userId = user.id;
    const config = new Config(user.token);

    axios
    .post("http://localhost:4000"+path, body, config)
    .then(()=>history.push("/"))
    .catch(error=>alert(error))
  }

  return (
    <PageWrapper>
      <Header>
        {
          logType === "earning"
          ? <p>Nova entrada</p>
          : <p>Nova saída</p>
        }
      </Header>
      <Form customSubmit={submitLog}>
        <input 
          required
          type="number"
          min="0"
          placeholder="Valor"
          value={formState.value}
          onChange={(e)=>{
            formState.value = e.target.value;
            setFormState({...formState});
          }}
        />
        <input
          required
          type="text"
          placeholder="Descrição"
          value={formState.description}
          onChange={(e)=>{
            formState.description = e.target.value;
            setFormState({...formState});
          }}
        />
        <button>
          {
            logType === "earning"
            ? <p>Salvar entrada</p>
            : <p>Salvar saída</p>
          }
        </button>
      </Form>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 25px 25px 16px 25px;
  min-height: 100vh;
  width: 100%;

  header{
    margin-bottom: 35px;
  }

  form{
    margin-bottom: 36px;
  }
`;

const Header = styled.header`
  font-size: 26px;
  font-weight: bold;
  line-height: 30px;
  width: 100%;
  height: 30px;
`;

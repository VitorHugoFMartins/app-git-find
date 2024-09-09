import { useState } from 'react'
import { Header } from "../../components/Header"
import Background from "../../assets/background.png"
import "./styles.css"
import { ItemList } from "../../components/ItemList/item"
function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    console.log(newUser)

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();
      console.log(newRepos)
      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  }
  return (
    <>
      <div className="App">
        <Header></Header>
        <div className="conteudo">
          <img src={Background} className="background" alt="background app"></img>
          <div className="info">
            <div>
              <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder="@username"></input>
              <button onClick={handleGetData}>Search</button>
            </div>
            {currentUser?.name ? (<>
              <div className="perfil">
                <img src={currentUser.avatar_url} className="profile" alt="imagem de perfil"></img>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
            ) : null}
            {repos?.length ? (
              <div>
                <h4 className="repositorio">Repositórios</h4>
                {repos.map(repo => (
                  <ItemList tittle={repo.name} description={repo.description} />
                ))}
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </>
  )
}

export default App

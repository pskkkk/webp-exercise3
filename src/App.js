import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-success is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Cute Dog Images</h1>
          </div>
        </div>
      </header>
    );
  }
  
  function Image(props) {  
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={props.src} alt="cute dog!" />
          </figure>
        </div>
      </div>
    );
  }
  
  function Loading() {
      return <p>Loading...</p>
  }

  function Gallery(props) {
    const {urls} = props;
    if(urls==null){
        return <Loading />
    }
    return (
      <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
            return (
            <div key={url} className="column is-3">
                <Image src={url} />
            </div>
            );
        })}
      </div>
    );
  }
  
  function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
      }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="breed" defaultValue="shiba">
                  <option value="shiba">Shiba</option>
                  <option value="akita">Akita</option>
                  <option value="boxer">Boxer</option>
                  <option value="husky">Husky</option>
                  <option value="mix">Mix</option>
                  <option value="pug">Pug</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchImages("shiba").then((urls) => {
            setUrls(urls);
        });
    }, []);
    function reloadImages(breed) {
        fetchImages(breed).then((urls) => {
          setUrls(urls);
        });
      }
    return (
      <main>
        <section className="section">
            <div className="container">
            
                <p>
                    このサイトは<strong>日本大学文理学部情報科学科 Webプログラミングの演習課題</strong>として作成されたものです。<br></br>
                    作成者は<strong>学籍番号5420033の留目沙也</strong>です。<br></br>
                </p>
                <br></br>
                <br></br>
                <div className="content has-text-centered">
                <p>
                    ・使い方<br></br>
                    リストから好きな犬種を選択(全部で6種類)<br></br>
                    ↓<br></br>
                    右のリロードをクリック<br></br>
                    ↓<br></br>
                    かわいい犬の画像がたくさん出てきます<br></br>
                </p>
                </div>
            </div>
        </section>
        <section className="section">
          <div className="container">
            <Form onFormSubmit={reloadImages}/>
          </div>  
        </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Dog images are retrieved from Dog API</p>
          <p>
            <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
          </p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;
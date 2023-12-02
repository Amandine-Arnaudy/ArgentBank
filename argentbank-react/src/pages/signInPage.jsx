import Form from '../containers/form'
import Header from '../containers/header'

function App() {

    return (
        <>
        <Header />
            <div className="form_container">
                <main className="main bg-dark">
                    <section className="sign-in-content">
                        <i className="fa fa-user-circle sign-in-icon"></i>
                        <h1>Sign In</h1>
                        <Form />
                    </section>
                </main>
            </div>

        </>
    )
}

export default App


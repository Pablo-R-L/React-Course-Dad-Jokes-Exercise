import React, { Component } from "react";
import Joke from "./Joke.js"
import axios from "axios"
import "./Joke.css"

const QUANT_JOKES = 5;
class Board extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")  //recebe text: "piada", nota: int
        }
        this.handleVote = this.handleVote.bind(this);
        this.newJoke = this.newJoke.bind(this);
        this.sortJokes = this.sortJokes.bind(this);

        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        console.log(this.seenJokes);
    }
    async handleVote(grade, id){
        let jokes_placeholder =  [...this.state.jokes]
        let j = jokes_placeholder[id].text;
        jokes_placeholder[id] = {text: j, nota: grade}; 
        
        this.sortJokes(jokes_placeholder);

        
     
    }
    async componentDidMount(){
        //await window.localStorage.removeItem("jokes");
        if (this.state.jokes.length === 0){ 
            let jokes_placeholder = [];
            
            try{
                while(jokes_placeholder.length < QUANT_JOKES){
                
                    let joke = await axios.get("https://icanhazdadjoke.com", {headers: { Accept: "application/json"}});
                    if (!this.seenJokes.has(joke.data.joke)){
                        jokes_placeholder = [...jokes_placeholder, {text: joke.data.joke, nota: 5}];
                    }
                    
                }
                this.setState({loading: false, jokes: jokes_placeholder});
                window.localStorage.setItem("jokes", JSON.stringify(jokes_placeholder));
            }catch(e){
                alert(e)
            }
            
        
        }else{
            this.setState({loading:false});
        }
    }

    async newJoke(){
        try{
            this.setState({loading: true})
        let jokes_placeholder = [...this.state.jokes];
        let jokes_length = jokes_placeholder.length;
        while(jokes_length === jokes_placeholder.length){
            let new_joke = await (await axios.get("https://icanhazdadjoke.com", {headers: { Accept: "application/json"}}))
            new_joke = new_joke.data.joke
            if(!this.seenJokes.has(new_joke)){
                jokes_placeholder = [...jokes_placeholder, {text: new_joke, nota: 5}];
            }
        }
        
        
        this.sortJokes(jokes_placeholder);
        }catch(e){
            alert(e);
            
        }
        
    }

    async sortJokes(jokes_placeholder){
        for(let i = 0; i < jokes_placeholder.length; i++){
            for(let j = i; j < jokes_placeholder.length; j++){
                if(jokes_placeholder[j].nota > jokes_placeholder[i].nota){
                    let ph = jokes_placeholder[i];
                    jokes_placeholder[i] = jokes_placeholder[j];
                    jokes_placeholder[j] = ph;
                    
                }
            }
        }


        await this.setState({jokes: [...jokes_placeholder], loading: false});
        window.localStorage.setItem("jokes", JSON.stringify(jokes_placeholder));
    }

    render(){
        let Joke_Classes = this.state.jokes.map((i,x)=> <Joke joke={i} id={x} key={x} handleVote={this.handleVote}/>)
        return(
            
            <div className="Joke_List">
                
                <div className="Side_Bar">
                    <h1 className="Joke_List_Title"><span>Dad</span> jokes</h1>
                    <img alt="laugh" className="Laughing_Emoji" src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"/>
                    <button onClick={this.newJoke} className="Get_More">Get new joke</button>
                </div>
                
                <div className="Board_Table">
                    {this.state.loading ? 
                        <div className="Loading_Screen">
                            <i className="far fa-8x fa-laugh fa-spin"/> 
                            <h1>Loading...</h1>
                        </div>
                        
                    : 
                        Joke_Classes}
                
                </div>
                
            </div>
            
        )
    }
}

export default Board;
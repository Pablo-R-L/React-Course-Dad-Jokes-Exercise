import React, { Component } from "react";
import "./Board.css"

class Joke extends Component{
    static defaultProps = {
        joke: {text: "breh",nota: 99},
        handleVote: ()=>console.log("Funcao not found")
    }
    

    async grade(grade){
       
        let nota = this.props.joke.nota + grade;
        
        this.props.handleVote(nota, this.props.id);
    }

    getEmoji(){
        let reaction;
        let Jnota = this.props.joke.nota;
        switch(true){
            
            case  Jnota >=  10:
                reaction = {emoji: "em em-rolling_on_the_floor_laughing Reaction"  , color: "#00ff37"};
                break;
            
            case  Jnota >=  8 && Jnota < 10:
                reaction = {emoji: "em em-laughing Reaction"  , color: "#b6f762"};
                break;
            
            case  Jnota >= 6 && Jnota < 8:
                reaction = {emoji: "em em-smiley Reaction"  , color: "#eeff00"};
                break;

            case Jnota >= 4 && Jnota < 6: 
                reaction ={emoji: "em em-slightly_smiling_face Reaction", color:"#ffd900"};
                break;

            case Jnota >= 2 && Jnota < 4:
                reaction = {emoji: "em em-neutral_face Reaction", color: "#fdb241"};
                break;

            case Jnota >= 0 && Jnota < 2:
                reaction ={emoji: "em em-confused Reaction", color: "#fd8c40"};
                break;

            default:
                reaction = {emoji: "em em-anguished Reaction", color: "#ff0000"};
                break;
        
        }
        return(reaction);
    }

    render(){
        
        let reaction = this.getEmoji();

        return(
            <div className="Board_Row">
                <h1 className="Joke">{this.props.joke.text}</h1>
                
                <div className="Buttons">
                    <i className="fa-solid fa-angles-up" onClick={()=>this.grade(1)}> </i>
                    <span className="Rating" style={{borderColor: reaction.color}}> {this.props.joke.nota} </span>
                    <i className="fa-solid fa-angles-down" onClick={()=>this.grade(-1)}> </i>
                    <i className={reaction.emoji}></i>
                </div>

            </div>
           
        )
    }
}

export default Joke
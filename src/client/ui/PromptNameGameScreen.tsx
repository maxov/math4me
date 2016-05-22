import * as React from "react";
import {GameRole} from "../clientGame";

interface Props {
  handler: (string, any) => {},
  gameRole: GameRole.GameRole
}

export class PromptNameGameScreen extends React.Component<Props, {errors:string}> {
  constructor(props: Props) {
    super(props);

    this.state = {errors: null};
  }

  submit(evt) {
    evt.preventDefault();
    let name = (this.refs['username'] as HTMLInputElement).value;
    if (name) {
      this.props.handler('gotName', name);
    } else {
      this.setState({errors: "Put <em>anything</em> as your username, come on!"});
    }
  }

  clearErrors() {
    this.setState({errors: null});
  }

  render() {
    let hasErrors = this.state.errors != null;
    let gameRoleName = null;
    if (this.props.gameRole instanceof GameRole.JoiningGame) {
      gameRoleName = `Joining game ${(this.props.gameRole as GameRole.JoiningGame).id}`;
    } else {
      gameRoleName = "Creating new game";
    }
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{gameRoleName}</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submit.bind(this)}>
                <label for="username">Username: </label>
                <div className={"form-group"+(hasErrors?" has-error":"")}>
                  <input type="text" className="form-control"
                         placeholder="Username" ref="username" id="username"
                         onChange={this.clearErrors.bind(this)}/>
                  {hasErrors ?
                    <span className="help-block"
                          dangerouslySetInnerHTML={{__html: this.state.errors}}>
                </span>
                    : null}
                </div>
                <button type="submit" className="btn btn-default">Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
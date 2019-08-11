import React,{Component} from 'react'
import Aux from '../ReactAux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent,axios) => {

    return class extends Component{
        constructor(props){
            super(props)
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req
            })
            axios.interceptors.response.use(res=>res,error=>{
                console.log(error)
                this.setState({error:error})
            });
        }
        state ={
            error : null
        }
        // componentDidMount(){
           
        // }
        withErrorCOnfirmed = () => {
            this.setState({error:null})
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.withErrorCOnfirmed}>
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
        
    }

}

export default withErrorHandler
import React, { Component } from "react";
import "./RequestItem.scss";
import axios from 'axios';

class RequestItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestcontent:[],
      requesthash:[],
      requestID:[],
      reload: 1,
    };
    this.getRequestData = this.getRequestData.bind(this);
    this.getDeContent = this.getDeContent.bind(this);
    this.renderRequests = this.renderRequests.bind(this);
  }
  async getDeContent(hash,id)
  {
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var ret = await axios.get(proxyurl+'https://gateway.btfs.trongrid.io/btfs/'+hash)
      .then(res => {
        this.setState(state => {
          const requestcontent = state.requestcontent.concat(res.data);
          const requesthash = state.requesthash.concat(hash);
          const requestID = state.requestID.concat(id);
          return {
            requestcontent,
            requesthash,
            requestID
          };
        });
        console.log(res.data);
      });
  }
  async getRequestData(_number,_rid){
    const data = {
      number: _number,
      rid: _rid
    };
    this.setState({
      reload:   0
    });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    await axios.post(proxyurl+ 'http://btfs.tron2moon.com/getrequest.php', data)
      .then(res => {
        //console.log(res);
        console.log(res.data);


        var Rdata =res.data;
        const leng = Rdata.length;

        for (var i=0;i<leng;i++)
        {
          this.getDeContent(Rdata[i]['hash'],Rdata[i]['id']);
        }
        console.log(this.requests);

      })   
  }
  renderRequests()
  {
    const datas = this.state.requestcontent;
    const hashes = this.state.requesthash;
    const RIDs = this.state.requestID;

    if (this.state.reload == 1){
      if (datas.length == 0)
        return 'Loading...';
    }
    else if (this.state.reload == 0)
      if (datas.length == 0)
        return "";   
    const tItems = datas.map((request, index) => (
      <div>
        <div className="table-row" id={this.props.rid+index} key={'reply_'+this.props.rid+index}>
          <div className="rank">Reply:</div>
          <div className="requestcontent">{request} </div>
          <div className="requestreply" id={RIDs[index]}></div>
          <div className="requestdelink"><a href={"https://gateway.btfs.trongrid.io/btfs/"+hashes[index]}>de-Link</a></div>
        </div>
        
      </div>
    ));
    return tItems;   
  }
  async componentDidMount() {
      
  }

  render() {
    if (this.state.reload == 1)
    {
      this.getRequestData(0,this.props.rid);
    }

  return (
      <div>
        {this.renderRequests()}
      </div>
    );
  }
}
export default RequestItem;


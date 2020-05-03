import React, { Component } from 'react'
class DragAndDrop extends Component {
  constructor(props) {
      super();
      this.dragCounter = 0;
  }

  state = {
    drag: false
  }
  dropRef = React.createRef()

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        if (this.props.onDrag) {
            this.props.onDrag(true);
        }
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter === 0) {
        if (this.props.onDrag) {
            this.props.onDrag(false);
        }
    }
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        if (this.props.onDrop) {
            this.props.onDrop(e.dataTransfer.files)
        }
        e.dataTransfer.clearData()
        this.dragCounter = 0    
        if (this.props.onDrag) {
            this.props.onDrag(false);
        }
    }
  }
  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }
  render() {
    return (
        <div ref={this.dropRef} > {this.props.children} </div>);
 }
}
export default DragAndDrop
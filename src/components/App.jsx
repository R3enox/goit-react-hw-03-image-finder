import { Component } from 'react';
import { Search } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQ: '',
  };

  handleSearch = searchQ => {
    this.setState({ searchQ });
  };

  render() {
    return (
      <>
        <Search handleSearch={this.handleSearch} />
        {this.state.searchQ !== null && (
          <ImageGallery searchQ={this.state.searchQ} />
        )}
      </>
    );
  }
}

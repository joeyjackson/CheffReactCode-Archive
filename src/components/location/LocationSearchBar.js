import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { classnames } from './utils';

class LocationSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
      selectedFranchise: '',
      selectedAddress: ''
    };
  }

  handleChange = address => {
    this.setState({
      latitude: null,
      longitude: null,
      errorMessage: ''
    });
    this.props.dispatch({
      type: 'tempSearchAddress',
      state: address
    });
  };

  extractFranchiseAndAddress = selected => {
    let franchise = '';
    let address = '';
    if (selected.indexOf('-') === -1) {
      franchise = selected.slice(0, selected.indexOf(','));
      address = selected.slice(selected.indexOf(',') + 2);
    } else {
      franchise = selected.slice(0, selected.indexOf('-'));
      address = selected.slice(selected.indexOf('-') + 2);
    }
    this.props.dispatch({
      type: 'selectedFranchise',
      state: franchise
    });
    this.props.dispatch({
      type: 'selectedAddress',
      state: address
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true });
    this.props.dispatch({
      type: 'tempSearchAddress',
      state: selected
    });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false
        });
        this.props.dispatch({
          type: 'selectedCoordinates',
          state: {
            lat: lat,
            lng: lng
          }
        });

        this.extractFranchiseAndAddress(selected);
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      latitude: null,
      longitude: null
    });
    this.props.dispatch({
      type: 'selectedFranchise',
      state: ''
    });
    this.props.dispatch({
      type: 'selectedAddress',
      state: ''
    });
    this.props.dispatch({
      type: 'tempSearchAddress',
      state: ''
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { errorMessage, latitude, longitude, isGeocoding } = this.state;
    const address = this.props.address;
    return (
      <div style={{ paddingBottom: '25px' }}>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Enter the name of your restaurant',
                      className: 'Demo__search-input'
                    })}
                  />
                  {address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </div>
                {/*TODO: Clean this up*/}
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {latitude &&
          longitude &&
          !isGeocoding &&
          console.log(latitude, longitude)}
      </div>
    );
  }
}

export default LocationSearchBar;

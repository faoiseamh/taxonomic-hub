import React from 'react';

// TODO: Replace this with something that parses the errors and maps them to show contextually on relevant fields
export function renderErrorFromResponse(response) {
  if (response == null) {
    return null;
  } else if (response.get('responseJSON') == null) {
    return null;
  }

  let errors = response.get('responseJSON').get('errors');
  let errorNodes;
  if (errors == null) {
    errors = [response.get('responseJSON').get('error')];
    errorNodes = errors.map((error) =>
      <div>
        {error}
      </div>,
    );
  } else {
    errorNodes = errors.entrySeq().map(([fieldName, fieldErrors]) =>
      fieldErrors.map((error) =>
        <div>
          {fieldName} {error}
        </div>,
      ),
    );
  }


  return (<div>{errorNodes}</div>);
}

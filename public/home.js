function logout() {
    document.location.href = "http://localhost:30000";
}


function readData() {
    token = window.localStorage.getItem('auth-token');
    tokenhtml = `<a href="https://jwt.io/#debugger-io?token=${token}" target="_blank">${token}</a>`;
    document.querySelector('#token').innerHTML = tokenhtml; // write the hyperlinked, signed and encrypted token
    
    // decode for payload data
    const payload = atob(token.split('.')[1]);
    const payload_split = payload.split(/([^{},:"]+)/);

    id = payload_split[3];
    iat = payload_split[7];
    idhtml = '<strong style="font-size: 14px;">ID</strong>'
    iathtml = '<strong style="font-size: 14px;">IAT</strong>'
    document.querySelector('#payload').innerHTML = `${idhtml}    ${id} <br> ${iathtml}    ${iat}`;
}

export const api = 'http://localhost:3002/oldarya'; // api end points url

// function to provide url for product images:
export const  generatePublicURL = (fileName) => {
    return `http://localhost:3002/public/${fileName}`
}
# TV GCP Frontend

## Technologies used

1. React
2. Tailwind CSS
3. Mui
4. Firebase

## How to run the project

1. Clone the repository
2. Run `npm install`
3. Run `npm run build`
4. Run `npm preview`

## Run using docker

```bash
docker build --build-arg BACKEND_URL=<BACKEND_URL> --build-arg PORT=<PORT> -t <IMAGE_NAME> .
docker run -p <PORT>:<PORT> <IMAGE_NAME>
```

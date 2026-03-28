import { spawn } from 'node:child_process';

const port =
  process.env.VITE_EXPOSE_PORT ||
  process.env.REACT_APP_EXPOSE_PORT ||
  '4040';

const child = spawn('mapps', ['tunnel:create', '-p', port], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

import { spawn } from 'node:child_process';

const ports = [
  process.env.VITE_EXPOSE_PORT || process.env.REACT_APP_EXPOSE_PORT || '4040',
  '4049',
  '4040',
];

const child = spawn('kill-port', [...new Set(ports)], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

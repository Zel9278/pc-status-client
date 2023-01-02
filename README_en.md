# PC Status Client
This is a tool that acquires PC status, sends it to [PC Status](https://pc-stats.eov2.com/), and displays it.

![image](https://cdn.discordapp.com/attachments/963367800821395466/1021358299603537930/unknown.png)

## This English translated by AutoPlayer

## Notice
**Due to the nature of the tool, the following content will be sent in a state that anyone can see it, so please do not use it if you feel uncomfortable even a little.**\
Information that leads to personal information will not be sent **except for the host name**, but if necessary, change the host name of the PC or add the following key in `.env` please.

```env
HOSTNAME=Character string to be displayed as host name
```

⚠️ **Only Node.js versions from v16 to v18 are supported.** ⚠️

**This project uses Corepack ([pnpm](https://github.com/pnpm/pnpm)).**

## Transmission and display contents
1. PC hostname (e.g. `assault-e5dmts`)
     - It is **strongly** recommended not to use host names that contain personal information.
     - Up to 64 characters are accepted, but characters after the 32nd are hidden with .... \
       All are displayed on mouseover.
2. OS version (e.g. `Windows 10 Home(Windows_NT win32 x64 10.0.19044)`)
3. CPU name, CPU usage (overall, per core) (e.g. `AMD Ryzen 5 3500 6-Core Processor`)
4. Memory usage
5. Storage footprint (see running root)
6. GPU Utilization (NVIDIA GPU only)
7. Boot time
8. Node version
9. Load Average (Linux only)

## Usage
___You can use it even if you put it in a Docker container!!(Linux only)___
1. Install Node.js v16 or higher, git
2. Clone the repository to any directory
3. Create a `.env` file
4. To prevent spam, ask [Developer's Twitter](https://twitter.com/c30_eo) for the password in advance.
5. Once you have the password, edit `.env` as follows

```env
PASS=Enter here the password you heard beforehand
```
### before doing this

Please run the below command
```console
corepack enable npm yarn pnpm
```

6. Run the command below

```cmd
REM if your on Windows
pnpm i
pnpm add -g pm2 pm2-windows-startup
pm2 start "pnpm node ." --name pcsc
pm2 save
pm2-startup install
```

```bash
# if your on Linux
pnpm i
pnpm add -g pm2
pm2 start "pnpm node ." --name pcsc
pm2 save
pm2 startup
# sudo env PATH=...A command like this will appear, so copy and paste it and execute it in the terminal
pm2 save
```

7. PROFIT, you made :D

## How to update

```console
git pull
pnpm i # If there is a package update etc.
pm2 restart
```

# 使用 Nginx 在 Ubuntu 上部署 Next.js App

> 由衷感謝 [Cloud Infrastructure Lab](https://www.facebook.com/NCU.CILab/about) 提供我們伺服器使用

> 此文件用以記錄本專案前端部署過程

- [使用 Nginx 在 Ubuntu 上部署 Next.js App](#使用-nginx-在-ubuntu-上部署-nextjs-app)
  - [Step 1. 設置 Nginx](#step-1-設置-nginx)
  - [Step 2. 為 Next.js App 提供服務配置 Nginx](#step-2-為-nextjs-app-提供服務配置-nginx)
  - [Step 3. 安裝 Node.js, NPM, PM2](#step-3-安裝-nodejs-npm-pm2)
  - [Step 4. 建置與部署 Next.js App!](#step-4-建置與部署-nextjs-app)
  - [Step 5. 設置 Let's Encrypt SSL (HTTPS)](#step-5-設置-lets-encrypt-ssl-https)

### Step 1. 設置 Nginx

1. 更新 apt 套件管理系統

   ```bash
   sudo apt update
   ```

2. 安裝 nginx

   ```bash
   sudo apt install nginx
   ```

3. 啟動 NGINX 服務

   ```bash
   sudo systemctl start nginx
   ```

4. 確認 Nginx 是否正常運行

   ```bash
   sudo systemctl status nginx
   ```

為了確保伺服器每次重啟時 Nginx 都會自動運行，可以輸入以下指令

```bash
sudo systemctl enable nginx
```

### Step 2. 為 Next.js App 提供服務配置 Nginx

1. 為你的網域(domain)建立一個配置檔。

   假設我們的 domain 是 `example.com` 我們需要輸入以下指令

   ```bash
   sudo nano /etc/nginx/sites-available/example.com
   ```

   若是沒有 domain 則輸入`default`

   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

2. 新增以下內容

   `server_name` 部分如果只有 `example.com` 沒有 `www.example.com` 的話輸入前者就好。如果沒有 domain 的話則以 `_` 取代即可。

   ```bash
   server {
           client_max_body_size 64M;
           listen 80;
           server_name example.com www.example.com;

           location / {
                   proxy_pass             http://127.0.0.1:3000;  # 這是Next.js App要監聽的port
                   proxy_read_timeout     60;
                   proxy_connect_timeout  60;
                   proxy_redirect         off;

                   # Allow the use of websockets
                   proxy_http_version 1.1;
                   proxy_set_header Upgrade $http_upgrade;
                   proxy_set_header Connection 'upgrade';
                   proxy_set_header Host $host;
                   proxy_cache_bypass $http_upgrade;
           }

   }
   ```

3. 建立一個連結(link)到 `sites-enabled` 資料夾下以啟動 Nginx 配置，Nginx 啟動時會讀取此資料夾

   ```bash
   sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
   ```

4. 確認一下這個配置檔案有沒有語法錯誤

   ```bash
   sudo nginx -t
   ```

5. 沒問題的話就可以重啟 Nginx server 囉

   ```bash
   sudo systemctl restart nginx
   ```

### Step 3. 安裝 Node.js, NPM, PM2

如果要運行 Next.js 應用勢必需要 Node.js，由於我們需要較新的版本，這裡使用 PPA 進行安裝步驟。

1. 到 home 目錄
   ```bash
   cd ~
   ```
2. 下載 Node.js 的 setup materials

   可以到 [nodesource/distributions](https://github.com/nodesource/distributions) 找自己想裝的版本

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   ```

3. 安裝 Node 跟 NPM
   ```bash
   sudo apt-get install -y nodejs
   ```
4. 確認一下 Node.js 跟 NPM 的版本
   ```bash
   node -v
   npm -v
   ```
5. 接下來要在伺服器上全域安裝程序管理套件 [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) !下個階段會用到
   ```bash
   npm install -g pm2
   ```

### Step 4. 建置與部署 Next.js App!

直接把檔案從 GitHub pull 下來然後 build。也可以在其他地方 build 完再把打包好的檔案傳到 server。但我覺得前者比較簡單，看人喜好～

以 `CARRYUU/smart-screening-checklist-system` 做示範

1. 從 git clone 專案，要放哪其實都可以
   ```bash
   git clone https://github.com/CARRYUU/smart-screening-checklist-system
   ```
2. 進到 Next.js 應用的資料夾
   ```bash
   cd/smart-screening-checklist-syste
   ```
   看 next 應用放哪，這裡是放在 `client` 所以要進去 `client` 資料夾
   ```bash
   cd client
   ```
3. 安裝依賴(dependencies)
   ```bash
   npm install
   ```
4. 建置打包
   ```bash
   npm run build
   ```
5. 使用 pm2 運行這個 Next.js 應用，名稱部分可以自己取

   ```bash
   pm2 start npm --name "next-app" --start
   ```

   其他常用指令

   ```bash
   pm2 status # 檢查運行狀態

   pm2 stop next-app # 停止next-app這個程序

   pm2 restart next-app # 重新啟動next-app這個程序
   ```

目前為止如果都成功的話應該就可以運行囉。於瀏覽器打上 `http://<your domain>`，如果沒有 domain 的話以 ip address 取代。如果有 domain 的話可以繼續下去配置 `https`!

如果要更新 Next.js 應用也很簡單，幾個步驟輕鬆搞定

```bash
   git pull
   cd client
   npm install
   npm run build
   pm2 restart next-app
```

### Step 5. 設置 Let's Encrypt SSL (HTTPS)

> 再次感謝 [Cloud Infrastructure Lab](https://www.facebook.com/NCU.CILab/about) 提供我們 domain 使用

> 使用 SSL 認證加密 server 與 client 之間的傳遞

1. 安裝 [`cerbot`](https://certbot.eff.org) 及其 plugins

   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. 取得 SSL 認證

   格式為 `-d <domain>`，可以多個

   ```bash
   sudo certbot --nginx -d example.com
   ```

3. 重啟 nginx
   ```bash
   sudo systemctl restart nginx
   ```

到這邊結束後不論你是不是打 `http` 為開頭都會被導向以 `https` 開頭的網址

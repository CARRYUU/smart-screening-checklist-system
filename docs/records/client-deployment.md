# 使用 Nginx 在 Ubuntu 上部署 Next.js App

> 由衷感謝 [Cloud Infrastructure Lab](https://www.facebook.com/NCU.CILab/about) 提供我們伺服器使用

- [使用 Nginx 在 Ubuntu 上部署 Next.js App](#使用-nginx-在-ubuntu-上部署-nextjs-app)
  - [Step 1: 設置 Nginx](#step-1-設置-nginx)
  - [Step 2: 配置 Nginx 為 Next.js App 提供服務](#step-2-配置-nginx-為-nextjs-app-提供服務)

### Step 1: 設置 Nginx

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

### Step 2: 配置 Nginx 為 Next.js App 提供服務

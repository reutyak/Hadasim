class AppConfig {
    public port = 4001;
    public mongodbConnectionString = `mongodb://localhost:27017/HMO`
}

const appConfig = new AppConfig();

export default appConfig;

EX2
This application implements a server side and a database and a client side for a system to manage a corona database for HMO. The application was built using technologies MERN (Mongodb, Express, React, Node.js). The entire project is created in all its parts on a local server. Client side The client side includes three main screens. Home / List / Add Home: On the Home screen you can view two graghs. The first graph shows the number of vaccinated versus the number of unvaccinated. Use of a server's request by http://localhost:4001/api/corona/vaccinated.

image

The second graph shows the number of active patients on each day of the last month. Use of a server's request by http://localhost:4001/api/corona/active/:date.

image

List: On the List screen you can view the list of all HMO members with all their personal details including a photo and their personal information regarding the corona virus, use of server's requests by http://localhost:4001/api/member and http://localhost:4001/api/member/images/:imageName. You can update a positive answer to Corona, Use of a server's request by http://localhost:4001/api/corona/:id/:positive/:rec as well as receiving vaccinations, Use of a server's request by http://localhost:4001/api/corona/.

image

Add: On Add screen you can add a new member to the HMO with all his personal details. Use of a server's request by http://localhost:4001/api/member

image

You can see a detailed API in the files https://github.com/reutyak/Hadasim/blob/master/ex2/Backend/thunder-collection_corona.json and https://github.com/reutyak/Hadasim/blob/master/ex2/Backend/thunder-collection_members.json
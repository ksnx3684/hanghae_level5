# hanghae_level5
항해99 Node.js Level5

### 1. 모든 로직을 Router에 구현하는 것이 아니라 Layered Architecture Pattern으로 프로젝트를 구현하였을 때, 어떠한 이점이 있을까요?

- 기존에는 Router에 모든 기능들이 구현되어 있었다면, 계층형 아키텍처 패턴은 Controller, Service, Repository라는 각각의 계층으로 나뉘어 각자의 역할을 수행한다. 각 계층은 다른 계층에 영향을 주지 않으며, 필요에 따라 특정 계층만 수정, 확장하여 좀 더 유연하게 프로젝트를 구현할 수 있다.


---


### 2. Controller, Service, Repository Layer는 각각 어떤 역할을 가지고 있나요?

- Controller : 클라이언트에서 들어오는 요청(Request)을 받고 이를 서비스에 전달한 뒤, 이후 서비스에서 받은 데이터를 받아 클라이언트에게 응답(Response)한다.

- Service : Controller에서 넘어온 요청을 비즈니스 로직을 통해 수행 후 데이터를 리턴한다. Repository를 통해 받아온 데이터를 가공하거나 캡슐화하고 추상화를 한다. 

- Repository : 쿼리를 수행하여 DB와 상호작용하며, DB에서 가져온 데이터를 Service 계층에 리턴해준다.
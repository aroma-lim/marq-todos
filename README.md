# 마크비전 기술면접 과제 (Marq-TODOS)

## 시작하기

`npm install` && `npm start`

## 과제 요구사항

- [x] 사용자는 문자열로 된 todo를 추가 할 수 있다.

- [x] 작성일, 최종수정일, 내용, 참조하고 있는 todo들의 id가 표시되어야 한다. (예시 참고)

- [x] 사용자는 todo를 완료 또는 미완료로 상태변경을 할 수 있다.

- [x] todo는 다른 todo들을 참조할 수 있다.

- [x] 참조하고 있는 todo들이 모두 완료 상태가 아니라면 todo를 완료할 수 없다.

- [x] 사용자는 todo 목록을 조회할 수 있다.

- [x] 사용자는 todo를 수정할 수 있다.

- [x] 사용자는 todo를 삭제할 수 있다.

다음의 기능을 구현하시면 추가 점수를 획득할 수 있습니다.

- [ ] 페이지네이션! 페이지네이션은 무한 스크롤로 구현하셔도 좋습니다.

- [x] 프로젝트-root/src/mocks/handlers.ts 에 mock api를 구현하고 todo 앱이 해당 api를 통해서 작동하도록 구현.

## 사용한 라이브러리

- redux toolkit

- react icon

- react uuid

- msw

## 구현

- mock api를 이용해 local storage를 DB처럼 사용하였습니다.

- react toolkit을 사용하여 상태관리를 하였습니다.

- 최초 todo 작성은 간단하게 제목만 쓰되, 수정 시에는 제목과 참조 todo를 설정할 수 있습니다.

- 평소에는 styled component를 애용하나, style.css 사용하는 방식으로 구현해보았습니다.

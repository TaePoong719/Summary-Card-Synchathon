import { useCallback, useState } from 'react'
import styled from 'styled-components'

const Sidebar = ({ userCards, setSearchedCards }) => {
  const [activeCategory, setActiveCategory] = useState('전체보기')
  const onClickHandler = useCallback((category) => {
    setActiveCategory(category)
    if (category === '전체보기') {
      setSearchedCards(userCards)
    } else {
      setSearchedCards(userCards.filter((card) => card.category === category))
    }
  })
  return (
    <Container>
      <SidebarList>
        <ListItem
          className={activeCategory === '전체보기' ? 'active' : ''}
          onClick={() => onClickHandler('전체보기')}
        >
          전체보기
        </ListItem>
        <ListItem
          className={activeCategory === '부동산' ? 'active' : ''}
          onClick={() => onClickHandler('부동산')}
        >
          부동산카드
        </ListItem>
        <ListItem
          className={activeCategory === '보험' ? 'active' : ''}
          onClick={() => onClickHandler('보험')}
        >
          보험카드
        </ListItem>
        <ListItem
          className={activeCategory === '은행' ? 'active' : ''}
          onClick={() => onClickHandler('은행')}
        >
          은행카드
        </ListItem>
        <ListItem
          className={activeCategory === '증권' ? 'active' : ''}
          onClick={() => onClickHandler('증권')}
        >
          증권카드
        </ListItem>
        <ListItem
          className={activeCategory === '기타' ? 'active' : ''}
          onClick={() => onClickHandler('기타')}
        >
          기타카드
        </ListItem>
      </SidebarList>
    </Container>
  )
}

const Container = styled.aside`
  position: fixed;
  z-index: 9;
  width: 200px;
  height: 100%;
  border-right: 3px solid #ddd;
`

const SidebarList = styled.ul`
  height: calc(100vh - 300px);
  min-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin-top: 30px;
`

const ListItem = styled.li`
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  margin-left: 20px;
  color: inherit;
  cursor: pointer;
  transition: color 0.3s;
  &:hover,
  &.active {
    color: var(--main-color);
  }
`

export default Sidebar

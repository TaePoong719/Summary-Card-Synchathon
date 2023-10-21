import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { MobileResponsive } from '../utils/responsive'
import { searchedUserCardsState, userCardsState } from '../atom/userCardState'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const Sidebar = () => {
  const userCards = useRecoilValue(userCardsState)
  const setSearchedCards = useSetRecoilState(searchedUserCardsState)
  const [activeCategory, setActiveCategory] = useState('전체')
  const [displaySidebar, setDisplaySidebar] = useState(false)
  const categories = ['전체', '부동산', '보험', '은행', '증권', '기타']
  const isResponsiveSidebar = MobileResponsive()

  const onClickHandler = useCallback((category) => {
    setActiveCategory(category)
    if (category === '전체') {
      setSearchedCards(userCards)
      setDisplaySidebar(false)
    } else {
      setSearchedCards(userCards.filter((card) => card.category === category))
      setDisplaySidebar(false)
    }
  })

  if (isResponsiveSidebar) {
    return (
      <MobileContainer>
        {/*Inner Container 부분이 움직입니다, MobileContainer 부분은 움직이지 않고, 모바일 사이드바 렌더링 시 나타납니다 */}
        <MobileInnerContainer $displaysidebar={displaySidebar ? 'true' : 'false'}>
          <div
            className="header__mobile-close-wrap"
            onClick={() => {
              setDisplaySidebar(false)
            }}
          >
            <img src={`${import.meta.env.BASE_URL}icon_close.svg`} alt="닫기 버튼" />
          </div>
          <SidebarList>
            {categories.map((name) => {
              return (
                <MobileListItem
                  key={name}
                  className={activeCategory === `${name}` ? 'active' : ''}
                  onClick={() => onClickHandler(`${name}`)}
                >
                  {name}카드
                </MobileListItem>
              )
            })}
          </SidebarList>
        </MobileInnerContainer>
        <div
          className="sidebar__openSidebar-icon"
          onClick={() => setDisplaySidebar((prev) => !prev)}
        >
          <img src={`${import.meta.env.BASE_URL}icon_list.svg`} alt="사이드바 열기 버튼" />
        </div>
      </MobileContainer>
    )
  } else {
    return (
      <Container>
        <SidebarList>
          {categories.map((name) => {
            return (
              <ListItem
                key={name}
                className={activeCategory === `${name}` ? 'active' : ''}
                onClick={() => onClickHandler(`${name}`)}
              >
                {name}카드
              </ListItem>
            )
          })}
        </SidebarList>
      </Container>
    )
  }
}

const MobileContainer = styled.aside`
  & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
  }
  .sidebar__openSidebar-icon {
    z-index: 13;
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    background-color: var(--main-color);
    cursor: pointer;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 25px;
      height: 25px;
    }
  }
`

const MobileInnerContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 15;
  background-color: #fff;
  left: ${(props) => (props.$displaysidebar === 'true' ? '0px;' : '-100%;')};
  transition: all 1s ease-in-out;

  .header__mobile-close-wrap {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
    }
  }
`

const MobileListItem = styled.li`
  margin-bottom: 20px;
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

import { useEffect, useState } from 'react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { useDetailsUser } from '../../hooks/useDetailUser'

import './style.scss'

const tabItem = 'tabItem'
const selected = 'selected'

const tabContentVariants: Variants = {
  initial: {
    x: -10,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 10,
    opacity: 0,
  },
}

export default function User() {
  const id = useParams()
  const { data, isLoading, error } = useDetailsUser(id)
  const [selectedTab, setSelectedTab] = useState(null)

  useEffect(() => {
    if (!isLoading && !error && data) {
      // Os dados estão prontos, selecione a primeira aba
      setSelectedTab(tabs[0])
    }
  }, [isLoading, error, data])

  const tabs = [
    {
      name: 'tab1',
      label: 'Info',
      render: () => {
        return (
          <div>
            <strong>Name: </strong>
            <p>
              {data.name.first} {data.name.last}
            </p>
            <strong>Title: </strong>
            <p>{data.name.title}</p>
            <strong>Email:</strong>
            <p>{data.email}</p>
          </div>
        )
      },
    },
    {
      name: 'tab2',
      label: 'Location',
      render: () => {
        return (
          <div>
            <strong>Street: </strong>
            <p>
              {data.location.street.name}, {data.location.street.number},
            </p>
            <strong>Post Code: </strong>
            <p>{data.location.postcode}</p>
            <strong>City: </strong>
            <p>{data.location.city}</p>
            <strong>State: </strong>
            <p>{data.location.state}</p>
            <strong>Country: </strong>
            <p>{data.location.country}</p>
          </div>
        )
      },
    },
    {
      name: 'tab3',
      label: 'Login',
      render: () => {
        return (
          <div>
            <strong>Username:</strong>
            <p>{data.login.username}</p>
            <strong>Password:</strong>
            <p>{data.login.password}</p>
          </div>
        )
      },
    },
  ]

  console.log(data)

  const handleClick = (e: any, tab: any) => {
    e.preventDefault()
    setSelectedTab(tab)
  }

  const isSelected = (tab: any) => selectedTab?.name === tab.name

  if (isLoading) return 'Carregando...'
  if (error) return 'Ocorreu um erro ao buscar os dados do usuário'

  const indicatorWidth = 100 / tabs.length

  return (
    <>
    <Link to="/"><small>Back</small></Link>
      
      <div className="container">
        <header className="headerUserPage">
          
          <img src={data.picture.medium} alt="" />
          <h2 className="title">
            {data.name.first} {data.name.last}
          </h2>
          <span>{data.name.title}</span>
        </header>

        <div className="tabWrapper">
          <div className="tabHeader">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={[tabItem, isSelected(tab) ? selected : '']}
              >
                <a href="#" onClick={(e: any) => handleClick(e, tab)}>
                  {tab.label}
                </a>

                {selectedTab && (
                  <motion.div
                    layoutId="indicator"
                    initial={false}
                    animate={{
                      x:
                        indicatorWidth *
                        tabs.findIndex((tab) => tab.name === selectedTab.name),
                    }}
                    // transition={{ type: 'tween', duration: 0.2 }}
                    className="indicator"
                  />
                )}
              </div>
            ))}
          </div>

          <div className={`tabContent ${isSelected(tabs) ? 'active' : ''}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab?.name || 'empty'}
                variants={tabContentVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {selectedTab && selectedTab?.render()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

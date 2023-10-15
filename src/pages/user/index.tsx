import { useEffect, useState } from 'react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { useDetailsUser } from '../../hooks/useDetailUser'
import { fadeIn } from '../../../variants'

import './style.scss'

interface Tab {
  name: string
  label: string
  render: () => JSX.Element
}

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

export default function UserDetail() {
  const id = useParams()
  const { data, isLoading, error } = useDetailsUser(id)
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null)

  useEffect(() => {
    if (!isLoading && !error && data) {
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: Tab) => {
    e.preventDefault()
    setSelectedTab(tab)
  }

  const isSelected = (tab: Tab) => selectedTab?.name === tab.name

  if (isLoading) return 'Carregando...'
  if (error) return 'Ocorreu um erro ao buscar os dados do usuário'

  const indicatorWidth = 100 / tabs.length

  return (
    <>
      <Link to="/">
        <small>Back</small>
      </Link>

      <div className="container">
        <header className="headerUserPage">
          <motion.img
            src={data.picture.medium}
            alt=""
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
          />
          <motion.h2
            className="title"
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {data.name.first} {data.name.last}
          </motion.h2>
          <motion.span
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {data.name.title}
          </motion.span>
        </header>

        <div className="tabWrapper">
          <div className="tabHeader">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={[tabItem, isSelected(tab) ? selected : ''].join(' ')}
              >
                <a
                  href="#"
                  onClick={(e) =>
                    handleClick(e as React.MouseEvent<HTMLAnchorElement>, tab)
                  }
                >
                  {tab.label}
                </a>
                {isSelected(tab) && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      height: '3px',
                      width: '100%',
                      backgroundColor: '#811AC0',
                      marginTop: '0.5rem',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className={`tabContent ${
              selectedTab && isSelected(selectedTab) ? 'active' : ''
            }`}
          >
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
